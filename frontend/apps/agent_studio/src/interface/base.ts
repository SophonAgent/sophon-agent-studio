export enum ResourceClassify {
  SYSTEM = 'system',
  CUSTOMIZED = 'customized',
}

export interface PageInfo {
  hasNextPage?: boolean;
  nextPage?: number;
  pageNum?: number;
  pageSize?: number;
  pages?: number;
  prePage?: number;
  total?: number;
}
