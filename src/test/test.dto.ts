// 创建测试项时的请求体结构
export interface CreateTestDto {
  name: string;
}

// 更新测试项时的请求体结构，字段均为可选
export interface UpdateTestDto {
  name?: string;
}
