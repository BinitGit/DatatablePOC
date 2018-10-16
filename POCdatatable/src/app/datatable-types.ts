export interface DataTableSettings {
  columns: Column[];
  rows: any[];
  filters: Filter[];
  paging: Paging;
  sort?: Sorting;
}

export interface Column {
  prop: string;
  name?: string;
}

export interface Filter {
  prop: string;
  title?: string;
  type: FilterType;
  fparams?: FilterParam[];
}

export enum FilterType {
  text = 1,
  dropdown
}

export interface FilterParam {
  key: string;
  value: any;
}

export interface Paging {
  size: number;
  totalElements: number;
  totalPages: Number;
  pageNumber: number;
}

export interface Sorting {
  prop: string;
  asc: boolean;
}
