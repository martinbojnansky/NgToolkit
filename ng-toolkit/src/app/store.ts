import { ChangeDetectorRef, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ObservableStateChange,
  ObservableStore,
  ObservableStoreComponent,
} from 'ng-toolkit-lib';
import { Dataset, Detail } from './core/models';
import { TodoDetail, TodoSummary } from './todo/models';

export interface State {
  todos: Dataset<TodoSummary>;
  todo: Detail<TodoDetail>;
}

export type Action =
  | 'createTodoStarted'
  | 'createTodoCompleted'
  | 'createTodoFailed'
  | 'createTodoCancelled'
  | 'readTodosStarted'
  | 'readTodosCompleted'
  | 'readTodosFailed'
  | 'readTodosCancelled'
  | 'readTodoStarted'
  | 'readTodoCompleted'
  | 'readTodoFailed'
  | 'readTodoCancelled'
  | 'updateTodoStarted'
  | 'updateTodoCompleted'
  | 'updateTodoFailed'
  | 'updateTodoCancelled'
  | 'deleteTodoStarted'
  | 'deleteTodoCompleted'
  | 'deleteTodoFailed'
  | 'deleteTodoCancelled';

@Injectable()
export class Store extends ObservableStore<State, Action> {
  constructor() {
    super({}, { log: !environment.production });
  }
}

export interface StateChange extends ObservableStateChange<State, Action> {}

export abstract class StoreComponent extends ObservableStoreComponent<
  State,
  Action
> {
  constructor(
    protected store: Store,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(store, changeDetectorRef);
  }
}
