import { Injectable, Injector } from '@angular/core';
import { actions, AppAction } from './actions';

@Injectable()
export class Store {
  constructor(protected injector: Injector) {}

  dispatch(action: AppAction<any>['payload']) {
    console.log(this.injector, action);
    this.injector.get(actions.sayHiAsync.reducer)?.reduce(action)?.subscribe();
  }
}
