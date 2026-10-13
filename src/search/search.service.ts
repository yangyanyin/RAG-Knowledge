import { Injectable } from '@nestjs/common';
import type { SearchResultItem } from './search.dto.js';
import { ChromaService } from '../chroma/chroma.service.js'
import { LlmService } from '../llm/llm.service.js';


@Injectable()
export class SearchService {

  
  constructor(
    private readonly chromaService: ChromaService,
    private readonly LlmService: LlmService
  ) {}


  // 语义检索：把关键词转成向量，在 Chroma 里找最相关的几段原文
  async search(keyword: string, topK: number = 5): Promise<any> {
    const collection = await this.chromaService.getCollection('documents_qwen')

    const result = await collection.query({
      queryTexts: [keyword],
      nResults: topK,
    });

    const documents = result.documents[0] ?? [];
    const metadatas = result.metadatas[0] ?? [];
    const distances = result.distances?.[0] ?? [];
    
    const items: SearchResultItem[] = [];
    documents.forEach((text, i) => {
      if (text === null) return;
      items.push({
        text,
        source: metadatas[i]?.source as string | undefined,
        heading: metadatas[i]?.heading as string | undefined,
        distance: distances[i] ?? undefined,
      });
    });
   
    return items
  
  }

  async *aiAnswer(question: string, items: SearchResultItem[]) {
    const chunks = items.map(item => item.text)
    yield* this.LlmService.streamChat(question, chunks)
  }

  getList () {
    return {
      code: 200,
      id: 12,
      name: 'yangyanyin222'
    };
  }

}