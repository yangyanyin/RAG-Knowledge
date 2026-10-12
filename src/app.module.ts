import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { TestModule } from './test/test.module.js';
import { searchModule } from './search/search.module.js';
import { chromaModule } from './chroma/chroma.module.js'
import { ConfigModule } from '@nestjs/config'
import { LlmModule } from './llm/llm.module.js'

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 读取 .env
    TestModule,
    searchModule,
    chromaModule,
    LlmModule
  ],
})
export class AppModule {}
