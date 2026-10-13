// // ChromaClient vs CloudClient：
// // - ChromaClient：连接自己搭建/自托管的 Chroma server（本地 host/port，无需 apiKey），
// //   需要自己装 Python 包并常驻运行 `chroma run`，数据存在自己的机器上，免费但要自己运维。
// // - CloudClient：连接 Chroma 官方托管的云服务（trychroma.com Cloud），
// //   用 apiKey + tenant + database 认证，不用自己起服务，数据存在 Chroma 云端，
// //   有免费额度、超出收费，运维由 Chroma 官方负责。
// // 两者本质都是向量数据库，区别只是"谁来运维这个数据库"，不是有没有数据库。
// import { CloudClient } from "chromadb";
// import { readFile, readdir } from 'node:fs/promises';
// import { chunkMarkdown } from "./markdown-chunker.ts"

// process.loadEnvFile();

// const docsDir = 'script/docs';
// const files = await readdir(docsDir);



// async function main () {




//   const client = new CloudClient({
//     apiKey: process.env.CHROMA_API_KEY,
//     tenant: process.env.CHROMA_TENANT,
//     database: process.env.CHROMA_DATABASE,
//   });

//   const collection = await client.getOrCreateCollection({
//     name: "documents",
//     // 必须跟 ChromaService 里建 collection 时用的 space 一致，
//     // 否则 Chroma Cloud 默认用 l2（受向量模长影响，不适合语义检索）
//     configuration: { spann: { space: 'cosine' } },
//   });


//   const allChunks = [];
//   for (const file of files) {
//     const md = await readFile(`${docsDir}/${file}`, 'utf-8');
//     allChunks.push(...chunkMarkdown(md, file));
//   }
  
//   await collection.add({
//     ids: allChunks.map((c) => c.id),
//     documents: allChunks.map((c) => c.text),
//     metadatas: allChunks.map((c) => ({ source: c.id.split('#')[0], heading: c.heading, chunkIndex: c.chunkIndex })),
//   });
// }

// main()
// .then(() => {
//   console.log('写入完成');
// })
// .catch((err) => {
//   console.error('写入失败:', err);
//   process.exitCode = 1;
// });


import { CloudClient } from 'chromadb';
import { readFile, readdir } from 'node:fs/promises';
import { chunkMarkdown } from './markdown-chunker.ts';
import { COLLECTION_NAME, createEmbeddingFunction } from '../src/chroma/embedding.ts';


process.loadEnvFile();

const docsDir = 'script/docs';
const files = await readdir(docsDir);

async function main() {
  const client = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE,
  });
  console.log(COLLECTION_NAME, 'COLLECTION_NAME')
  const collection = await client.getOrCreateCollection({
    name: COLLECTION_NAME,
    embeddingFunction: createEmbeddingFunction(), // 写入时用 Qwen 生成向量
    configuration: { spann: { space: 'cosine' } },
  });

  const allChunks = [];
  for (const file of files) {
    const md = await readFile(`${docsDir}/${file}`, 'utf-8');
    allChunks.push(...chunkMarkdown(md, file));
  }

  const BATCH = 50;
  for (let i = 0; i < allChunks.length; i += BATCH) {
    const batch = allChunks.slice(i, i + BATCH);
    await collection.upsert({
      ids: batch.map((c) => c.id),
      documents: batch.map((c) => c.text),
      metadatas: batch.map((c) => ({
        source: c.id.split('#')[0],
        heading: c.heading ?? '',
        chunkIndex: c.chunkIndex,
      })),
    });
    console.log(`已写入 ${Math.min(i + BATCH, allChunks.length)} / ${allChunks.length}`);
  }
}

main()
  .then(() => console.log('写入完成'))
  .catch((err) => {
    console.error('写入失败:', err);
    process.exitCode = 1;
  });

  