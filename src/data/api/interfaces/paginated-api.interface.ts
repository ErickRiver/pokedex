export interface ApiResourceRef {
  name: string;
  url: string;
}

export interface PaginatedResult<T = ApiResourceRef> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
