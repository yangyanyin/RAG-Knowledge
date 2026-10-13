import {
  ChromaCloudQwenEmbeddingFunction,
  ChromaCloudQwenEmbeddingModel,
} from '@chroma-core/chroma-cloud-qwen';

export const COLLECTION_NAME = 'documents_qwen'; // 新集合名，不要和旧的 documents 混用

export function createEmbeddingFunction() {
  return new ChromaCloudQwenEmbeddingFunction({
    apiKeyEnvVar: 'CHROMA_API_KEY', // 读你已有的环境变量，不用新增
    model: ChromaCloudQwenEmbeddingModel.QWEN3_EMBEDDING_0p6B,
    task: 'nl_to_code', // 照抄官方示例，见下面的说明
  });
}