// 前端发起搜索请求时的请求体结构
export interface SearchDto {
  keyword: string;
  ai_search: boolean;
}

// 单条检索结果：命中的原文片段 + 来源信息
export interface SearchResultItem {
  text: string;
  source?: string;
  heading?: string;
  distance?: number;
}
