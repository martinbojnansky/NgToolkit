export interface UuidObject {
  id: string;
}

export interface AsyncStateObject {
  isBusy: boolean;
  error: Error;
}

export interface Dataset<T> extends AsyncStateObject {
  items: T[];
}

export interface Detail<T> extends AsyncStateObject {
  item: T;
}
