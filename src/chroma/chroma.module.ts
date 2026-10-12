import { Module, Global } from '@nestjs/common';
import { ChromaService } from './chroma.service.js'

@Global()
@Module({
  providers: [ChromaService],
  exports: [ChromaService]
})
export class chromaModule {}

