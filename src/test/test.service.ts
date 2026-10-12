import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateTestDto, UpdateTestDto } from './test.dto.js';

export interface TestItem {
  id: number;
  name: string;
}

// 用内存数组模拟数据存储，仅用于联调/测试，进程重启后数据会丢失
@Injectable()
export class TestService {
  private items: TestItem[] = [];
  private nextId = 1;

  findAll() {
    return {
      code: 200,
      id: 1,
      name: 'yangyanyin'
    };
  }

  findOne(id: number): TestItem {
    const item = this.items.find((it) => it.id === id);
    if (!item) {
      throw new NotFoundException(`未找到 id 为 ${id} 的测试项`);
    }
    return item;
  }

  create(dto: CreateTestDto): TestItem {
    const item: TestItem = { id: this.nextId++, name: dto.name };
    this.items.push(item);
    return item;
  }

  update(id: number, dto: UpdateTestDto): TestItem {
    const item = this.findOne(id);
    if (dto.name !== undefined) {
      item.name = dto.name;
    }
    return item;
  }

  remove(id: number): void {
    const index = this.items.findIndex((it) => it.id === id);
    if (index === -1) {
      throw new NotFoundException(`未找到 id 为 ${id} 的测试项`);
    }
    this.items.splice(index, 1);
  }
}
