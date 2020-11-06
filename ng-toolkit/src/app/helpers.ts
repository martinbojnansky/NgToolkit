import { nameof } from 'ng-toolkit-lib';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class DB {
  protected readonly delay = 3000;

  protected getTable<T>(entityName: string): { [key: string]: T } {
    return (
      (JSON.parse(localStorage.getItem(entityName)) as { [key: string]: T }) ||
      {}
    );
  }

  getItems<T>(entityName: string) {
    const table = this.getTable(entityName);
    return of(Object.keys(table).map((k) => table[k]) as T[]).pipe(
      delay(this.delay)
    );
  }

  getItem<T>(entityName: string, id: string) {
    return of(this.getTable(entityName)[id] as T).pipe(delay(this.delay));
  }

  setItem<T>(entityName: string, value: T) {
    const table = this.getTable(entityName);
    table[value[nameof<UuidObject>('id')]] = value;
    localStorage.setItem(entityName, JSON.stringify(table));
    return of(value).pipe(delay(this.delay));
  }

  deleteItem(entityName: string, id: string) {
    const table = this.getTable(entityName);
    delete table[id];
    localStorage.setItem(entityName, JSON.stringify(table));
    return of({}).pipe(delay(this.delay));
  }
}

export const db = new DB();
