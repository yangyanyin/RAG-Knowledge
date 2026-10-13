import type { EmbeddingFunction } from 'chromadb';
import { OpenAI } from 'openai'; 


export class ArkEmbeddingFunction implements EmbeddingFunction {
  private readonly client = new OpenAI({
    apiKey: process.env.ARK_API_KEY,
    baseURL: process.env.ARK_BASE_URL,
  });


  

  async generate(texts: string[]): Promise<number[][]> {
   const res = await this.client.embeddings.create({
      model: 'doubao-embedding-large-text-250515',
      input: texts,
      encoding_format: 'float',
    });
    return res.data.map((d: { embedding: number[] }) => d.embedding);
  }
}