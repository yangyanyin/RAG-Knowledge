import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
// import OpenAI from 'openai'
// import type OpenAI from 'openai';
import { OpenAI } from 'openai'; 



@Injectable()
export class LlmService {
  private client: OpenAI
  private model: string

  constructor(config: ConfigService) {

    this.client = new OpenAI({
      apiKey: config.get('ARK_API_KEY'),
      baseURL: config.get('ARK_BASE_URL'),
      timeout: 60_000,
    })
    this.model = config.get('ARK_MODEL')!
  }
  
  // 流式返回，yield 每一段文本
  async *streamChat(question: string, chunks: string[]) {
    const context = chunks.map((c, i) => `[${i + 1}] ${c}`).join('\n')
    console.log(question, 'question')
    console.log(context, 'context')

    const stream = await this.client.chat.completions.create({
      model: this.model,
      stream: true,
      messages: [
        {
          role: 'system',
          content:
            '请仅根据【参考资料】回答问题，资料中没有相关信息就说"根据现有文档无法回答"，回答时标注引用编号。',
        },
        {
          role: 'user',
          content: `【参考资料】\n${context}\n\n【用户问题】\n${question}`,
        },
      ],
    })

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content
      if (text) yield text
    }
  }
}