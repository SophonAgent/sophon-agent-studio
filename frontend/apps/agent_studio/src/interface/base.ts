export const ResourceClassify = {
  SYSTEM: 'system',
  CUSTOMIZED: 'customized',
} as const;
export type ResourceClassify = (typeof ResourceClassify)[keyof typeof ResourceClassify];

export interface PageInfo {
  hasNextPage?: boolean;
  nextPage?: number;
  pageNum?: number;
  pageSize?: number;
  pages?: number;
  prePage?: number;
  total?: number;
}
