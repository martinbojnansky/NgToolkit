export interface UuidObject {
  id: string;
}

export interface AsyncStateObject {
  isBusy: boolean;
  error: Error;
}

export interface DatasetQuerySort {
  prop: string;
  order: 'asc' | 'desc';
}

export interface DatasetQuery {
  sorts: DatasetQuerySort[];
}

export interface Dataset<T> extends AsyncStateObject, DatasetQuerySort {
  items: T[];
}

export interface Detail<T> extends AsyncStateObject {
  item: T;
}
