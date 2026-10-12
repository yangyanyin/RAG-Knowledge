import { Injectable } from '@nestjs/common';
import { CloudClient } from 'chromadb';
import type { Collection } from 'chromadb';

import { DefaultEmbeddingFunction } from '@chroma-core/default-embed';

const COLLECTION_NAME = 'documents';

@Injectable()
export class ChromaService {
  private readonly client = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE,
  });

  private readonly embeddingFunction = new DefaultEmbeddingFunction();

  // 缓存已获取的 collection，避免每次调用都重新请求一次网络
  private readonly collectionCache = new Map<string, Promise<Collection>>();
  
  getCollection(name = COLLECTION_NAME): Promise<Collection> {
    if (!this.collectionCache.has(name)) {
      this.collectionCache.set(
        name,
        this.client.getOrCreateCollection({
          name,
          embeddingFunction: this.embeddingFunction,
          // Chroma Cloud 默认给 collection 分配的是 spann 索引，
          // 不会像 hnsw 那样自动套用 embeddingFunction.defaultSpace()，
          // 不显式指定的话会退化成 l2（受向量模长影响，不适合语义检索），
          // 这里显式指定成 cosine，只在“创建”这一刻生效，对已存在的 collection 无效
          configuration: { spann: { space: 'cosine' } },
        }),
      );
      }
    return this.collectionCache.get(name)!;
  }
}