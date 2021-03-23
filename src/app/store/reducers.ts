import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { actions } from './actions';

export interface Reducer {
  reduce(action: any): any;
}

export interface AsyncReducer {
  reduce(action: any): Observable<void>;
}

@Injectable()
export class SayHiReducer implements Reducer {
  constructor() {}

  reduce(action: any): any {
    console.log({ greeting: `Hiiii, ${action.name}` });
    return { greeting: action.name };
  }
}

@Injectable()
export class SayHiAsyncReducer implements AsyncReducer {
  constructor() {}

  reduce(action: typeof actions.sayHiAsync): Observable<void> {
    return of(1).pipe(
      tap(() => {
        console.log('started' as typeof action.effectsType, {
          greeting: `Hiiii, ${action.name}`,
        });
      }),
      delay(3000),
      map(() => {
        console.log('completed' as typeof action.effectsType, {
          greeting: `Hiiii, ${action.name}`,
        });
        return;
      })
    );
  }
}
