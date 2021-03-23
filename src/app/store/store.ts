import { Injectable, Injector } from '@angular/core';
import { AppAction } from './actions';

@Injectable()
export class Store {
  constructor(protected injector: Injector) {}

  dispatch(action: AppAction<any, any, any>) {
    this.injector.get(action.reducerType)?.reduce(action)?.subscribe(); // TODO: Subscribe until..
  }
}
