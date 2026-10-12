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
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import type { CreateTestDto, UpdateTestDto } from './test.dto.js';
import { TestService } from './test.service.js';
import { AppProxyGuard } from './shopify/app-proxy.guard.js'

@Controller('test')
@UseGuards(AppProxyGuard)    
export class TestController {
  constructor(private readonly testService: TestService) {}

  // GET /test
  // 出参：TestItem[]
  @Get()
  findAll(@Query() query: Record<string, string>, @Body() body: any, ) {
    console.log('get 查询参数', query);
    console.log('get 请求体', body);
    return this.testService.findAll();
  }

  // GET /test/:id
  // 出参：TestItem；找不到时返回 404
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testService.findOne(id);
  }

  // POST /test
  // 入参：{ name: string }
  // 出参：新建的 TestItem
  @Post()
  testPost(@Query() query: Record<string, string>, @Body() body: any, @Req() req: Request) {
    console.log('post 查询参数', query);
    console.log('post 请求体', body);
    // console.log('请求头', req.headers);
    return { query, body };
  }

  // PATCH /test/:id
  // 入参：{ name?: string }
  // 出参：更新后的 TestItem；找不到时返回 404
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTestDto) {
    return this.testService.update(id, dto);
  }

  // DELETE /test/:id
  // 出参：204 No Content；找不到时返回 404
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.testService.remove(id);
  }
}
