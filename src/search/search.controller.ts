import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res
} from '@nestjs/common';
import { SearchService } from './search.service.js'
import type { SearchDto } from './search.dto.js'
import type { Response } from 'express';

@Controller('search')
export class SearchController {

  constructor(private readonly SearchService: SearchService) {}

  @Get()
  getList() {
    return this.SearchService.getList()
  }

  // POST /api/search
  // 入参：{ keyword: string }
  // 出参：{ code: 200, data: SearchResultItem[] }
  @Post()
  async create(@Body() dto: SearchDto, @Res() res: Response) {
    const aiSearch = [true, 'true', 1, '1'].includes(dto.ai_search || false)
    const data = await this.SearchService.search(dto.keyword);
    if (!aiSearch) {
      return res.json({ code: 200, data })
  
    }

    // 开关打开：SSE 流式
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    let closed = false;
    res.on('close', () => (closed = true));

    try {
      for await (const text of this.SearchService.aiAnswer(dto.keyword, data)) {
        if (closed) break;
        res.write(`data: ${JSON.stringify(text)}\n\n`);
      }
      res.write(`event: done\ndata: [DONE]\n\n`);
    } catch (e) {
      res.write(`event: error\ndata: ${JSON.stringify('AI 服务异常，请稍后重试')}\n\n`);
    } finally {
      res.end();
    }

    
  }
}

