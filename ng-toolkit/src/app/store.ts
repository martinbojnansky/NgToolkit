import { Injectable } from '@angular/core';
import {
  ObservableStateChange,
  ObservableStore,
} from 'dist/ng-toolkit-lib/store';

export interface State {
  testValue: string;
}

export enum Action {
  testAction = 'testAction',
}

export interface StateChange extends ObservableStateChange<State, Action> {}

@Injectable()
export class Store extends ObservableStore<State, Action> {
  constructor() {
    super();
  }
}
