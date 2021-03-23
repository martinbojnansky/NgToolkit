import { Injectable } from '@angular/core';
import { actions } from './actions';

export interface Reducer<TAction> {
  reduce(action: TAction): any;
}

@Injectable()
export class SayHiReducer implements Reducer<typeof actions.sayHi.actionType> {
  constructor() {}

  reduce(action: typeof actions.sayHi.actionType): any {
    console.log(action);
    return { greeting: action.payload.name };
  }
}

// @Injectable()
// export class SayHiAsyncReducer implements AsyncReducer {
//   constructor() {}

//   reduce(action: typeof actions.sayHiAsync): Observable<void> {
//     return of(1).pipe(
//       tap(() => {
//         console.log('started' as typeof action.effects.started, {
//           greeting: `Hiiii, ${action.name}`,
//         });
//       }),
//       delay(3000),
//       map(() => {
//         console.log('completed' as typeof action.effects.completed, {
//           greeting: `Hiiii, ${action.name}`,
//         });
//         return;
//       })
//     );
//   }
// }
