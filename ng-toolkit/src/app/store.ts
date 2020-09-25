import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ObservableStateChange, ObservableStore } from 'ng-toolkit-lib';

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
    super({}, { log: !environment.production });
  }
}
