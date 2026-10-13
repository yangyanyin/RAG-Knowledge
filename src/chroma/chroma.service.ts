// import { Injectable } from '@nestjs/common';
// import { CloudClient } from 'chromadb';
// import type { Collection } from 'chromadb';
// import { ArkEmbeddingFunction } from './ark-embedding.js';
// const COLLECTION_NAME = 'documents_ark'; // 换新名字，避免和旧的 384 维数据混在一起

// @Injectable()
// export class ChromaService {
//   private readonly client = new CloudClient({
//     apiKey: process.env.CHROMA_API_KEY,
//     tenant: process.env.CHROMA_TENANT,
//     database: process.env.CHROMA_DATABASE,
//   });

//   private readonly embeddingFunction = new ArkEmbeddingFunction();

//   // 缓存已获取的 collection，避免每次调用都重新请求一次网络
//   private readonly collectionCache = new Map<string, Promise<Collection>>();
  
//   getCollection(name = COLLECTION_NAME): Promise<Collection> {
//     let cached = this.collectionCache.get(name);
//     if (!cached) {
//       cached = this.client
//         .getOrCreateCollection({
//           name,
//           embeddingFunction: this.embeddingFunction,
//           configuration: { spann: { space: 'cosine' } },
//         })
//         .catch((err) => {
//           this.collectionCache.delete(name); // 失败不缓存，下次重试
//           throw err;
//         });
//       this.collectionCache.set(name, cached);
//     }
//     return cached;
//   }
// }


import { Injectable } from '@nestjs/common';
import { CloudClient } from 'chromadb';
import type { Collection } from 'chromadb';
import { COLLECTION_NAME, createEmbeddingFunction } from './embedding.js'; // Nest 里用 .js 后缀

@Injectable()
export class ChromaService {
  private readonly client = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE,
  });

  private readonly embeddingFunction = createEmbeddingFunction();
  private readonly collectionCache = new Map<string, Promise<Collection>>();

  getCollection(name = COLLECTION_NAME): Promise<Collection> {
    let cached = this.collectionCache.get(name);
    if (!cached) {
      cached = this.client
        .getOrCreateCollection({
          name,
          embeddingFunction: this.embeddingFunction,
          configuration: { spann: { space: 'cosine' } },
        })
        .catch((err) => {
          this.collectionCache.delete(name); // 失败不缓存
          throw err;
        });
      this.collectionCache.set(name, cached);
    }
    return cached;
  }
}