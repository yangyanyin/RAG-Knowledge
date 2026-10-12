import { Module, Global } from '@nestjs/common'
import { LlmService } from './llm.service.js'

@Global()
@Module({
  providers: [LlmService],
  exports: [LlmService], // 导出，别的模块才能注入使用
})
export class LlmModule {}