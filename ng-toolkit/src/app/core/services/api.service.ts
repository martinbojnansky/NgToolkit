import { Injectable } from '@angular/core';
import { nameof } from 'ng-toolkit-lib';
import { Observable, of, OperatorFunction } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { DatasetQuery, UuidObject } from '../models';

export abstract class ApiService {
  abstract getUuid(): string;
  abstract getItems<T extends UuidObject>(
    entity: string,
    query?: DatasetQuery
  ): Observable<T[]>;
  abstract getItem<T extends UuidObject>(
    entity: string,
    id: string
  ): Observable<T>;
  abstract setItem<T extends UuidObject>(
    entity: string,
    value: T
  ): Observable<T>;
  abstract deleteItem<T>(entity: string, id: string): Observable<void>;
}

@Injectable()
export class ApiServiceFakeImpl extends ApiService {
  constructor() {
    super();
  }

  getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getItem<T extends UuidObject>(entity: string, id: string) {
    return of(this.getTable<T>(entity)[id] as T).pipe(
      this.fakeApiOperator(),
      tap((v) => {
        if (!v)
          throw new Error(
            `Item of ${entity} entity with id ${id} does not exist.`
          );
      })
    );
  }

  getItems<T extends UuidObject>(entity: string, query?: DatasetQuery) {
    const table = this.getTable<T>(entity);

    let items = Object.keys(table).map((k) => table[k]) as T[];
    items = this.sortItems(items, query);

    return of(items).pipe(this.fakeApiOperator());
  }

  setItem<T extends UuidObject>(entity: string, value: T) {
    const table = this.getTable<T>(entity);
    table[value[nameof<UuidObject>('id')]] = value;
    this.setTable(entity, table);
    return of(value).pipe(this.fakeApiOperator());
  }

  deleteItem<T extends UuidObject>(entity: string, id: string) {
    const table = this.getTable<T>(entity);
    delete table[id];
    this.setTable(entity, table);
    return of(1).pipe(
      this.fakeApiOperator(),
      map(() => {})
    );
  }

  protected getTable<T>(entity: string): { [key: string]: T } {
    return (
      (JSON.parse(localStorage.getItem(entity)) as { [key: string]: T }) || {}
    );
  }

  protected setTable<T>(entity: string, value: { [key: string]: T }) {
    localStorage.setItem(entity, JSON.stringify(value));
  }

  protected sortItems<T>(items: T[], query: DatasetQuery): T[] {
    let sortedItems = [...items];
    query?.sorts?.forEach((s) => {
      sortedItems = sortedItems.sort((a, b) => {
        if (a[s.prop] < b[s.prop]) {
          return s.order === 'asc' ? -1 : 1;
        } else if (a[s.prop] > b[s.prop]) {
          return s.order === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    });
    return sortedItems;
  }

  fakeApiOperator<T>(): OperatorFunction<T, T> {
    return (observable$) =>
      observable$.pipe(
        delay(3000),
        tap(() => {
          if (!window.navigator.onLine) {
            throw new Error('No internet connection is available.');
          }
        })
      );
  }
}
