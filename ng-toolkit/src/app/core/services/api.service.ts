import { Injectable } from '@angular/core';
import { nameof } from 'ng-toolkit-lib';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { UuidObject } from '../models';

export abstract class ApiService {
  abstract getUuid(): string;
  abstract getItems<T extends UuidObject>(entity: string): Observable<T[]>;
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
  protected readonly delay = 800;

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
      delay(this.delay),
      tap((v) => {
        if (!v)
          throw new Error(
            `Item of ${entity} entity with id ${id} does not exist.`
          );
      })
    );
  }

  getItems<T extends UuidObject>(entity: string) {
    const table = this.getTable<T>(entity);
    return of(Object.keys(table).map((k) => table[k]) as T[]).pipe(
      delay(this.delay)
    );
  }

  setItem<T extends UuidObject>(entity: string, value: T) {
    const table = this.getTable<T>(entity);
    table[value[nameof<UuidObject>('id')]] = value;
    this.setTable(entity, table);
    return of(value).pipe(delay(this.delay));
  }

  deleteItem<T extends UuidObject>(entity: string, id: string) {
    const table = this.getTable<T>(entity);
    delete table[id];
    this.setTable(entity, table);
    return of().pipe(
      delay(this.delay),
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
}
