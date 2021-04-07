export interface UuidObject {
  id: string;
}

export interface AsyncStateObject {
  busy: boolean;
  error: Error;
}

export interface Dataset<T> extends AsyncStateObject {
  items: T[];
}

export interface StoreSampleSummary extends UuidObject {
  title: string;
}
