export interface IPagination<data> {
  page: number;
  total_pages: number;
  total_results: number;
  results: data;
}
