import { ChangeDetectorRef, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ObservableStateChange,
  ObservableStore,
  ObservableStoreComponent,
} from 'ng-toolkit-lib';
import { Dataset, Detail } from './helpers';
import { TodoDetail, TodoSummary } from './todo';

export interface State {
  todos: Dataset<TodoSummary>;
  todo: Detail<TodoDetail>;
}

export enum Action {
  createTodo = 'createTodo',
  readTodos = 'readTodos',
  readTodo = 'readTodo',
  updateTodo = 'updateTodo',
  deleteTodo = 'deleteTodo',

  todoVisibilitySettingsChanged = 'todoVisibilitySettingsChanged',
}

@Injectable()
export class Store extends ObservableStore<State, Action> {
  constructor() {
    super({}, { log: !environment.production });
  }
}

export interface StateChange extends ObservableStateChange<State, Action> {}

export class StoreComponent extends ObservableStoreComponent<State, Action> {
  constructor(
    protected store: Store,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(store, changeDetectorRef);
  }
}
