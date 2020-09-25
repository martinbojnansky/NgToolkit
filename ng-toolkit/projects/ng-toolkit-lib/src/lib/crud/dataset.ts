export interface DatasetQuery {
  pageNumber?: number;
  pageSize?: number;
  sorts?: string[];
  filters?: DatasetFilter[];
}

export interface Dataset<T> extends DatasetQuery {
  isBusy?: boolean;
  isCreating?: boolean;
  items?: T[];
  totalItemsCount?: number;
  error?: any;
}

export interface DatasetFilterSettings {
  searchFields: string[];
  filters: DatasetFilter[];
}

export interface DatasetFilter {
  group: string;
  label: string;
  query: string;
}
