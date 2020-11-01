import { ChangeDetectorRef, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ObservableStateChange, ObservableStore, ObservableStoreComponent } from 'ng-toolkit-lib';
import { Dataset, Detail } from './helpers';
import { TodoDetail, TodoSummary } from './todo';

export interface State {
  todos: Dataset<TodoSummary>;
  todo: Detail<TodoDetail>
}

export enum Action {
  createTodoStarted = 'createTodoStarted',
  createTodoCompleted = 'createTodoCompleted',
  createTodoFailed = 'createTodoFailed',

  readTodosStarted = 'readTodosStarted',
  readTodosCompleted = 'readTodosCompleted',
  readTodosFailed = 'readTodosFailed',

  readTodoStarted = 'readTodoStarted',
  readTodoCompleted = 'readTodoCompleted',
  readTodoFailed = 'readTodoFailed',

  updateTodoStarted = 'updateTodoStarted',
  updateTodoCompleted = 'updateTodoCompleted',
  updateTodoFailed = 'updateTodoFailed',

  deleteTodoStarted = 'deleteTodoStarted',
  deleteTodoCompleted = 'deleteTodoCompleted',
  deleteTodoFailed = 'deleteTodoFailed',

  todoSelected = 'todoSelected',

  todoVisibilitySettingsChanged = 'todoVisibilitySettingsChanged'
}

@Injectable()
export class Store extends ObservableStore<State, Action> {
  constructor() {
    super({}, { log: !environment.production });
  }
}

export interface StateChange extends ObservableStateChange<State, Action> {}

export class StoreComponent extends ObservableStoreComponent<State, Action> {
  constructor(protected store: Store, protected changeDetectorRef: ChangeDetectorRef) {
    super(store, changeDetectorRef)
  }
}

// export const action = (name: string) => {
//   return {
//     [name]: name
//   }
// }

// export const asyncActions = (name: string) => {
//   return {
//     ...action(`${name}Started`),
//     ...action(`${name}Completed`),
//     ...action(`${name}Failed`)
//   }
// }

// export const crudActions = (name: string) => {
//   return {
//     ...asyncActions(`create${name}`),
//     ...asyncActions(`read${name}s`),
//     ...asyncActions(`read${name}`),
//     ...asyncActions(`update${name}`),
//     ...asyncActions(`delete${name}`),
//     ...action(`${name}Selected`)
//   }
// }

// export type Action = keyof typeof action;
// export const actions = {
//     ...crudActions('todo'),
//     ...action('todoVisibilityChanged')
// }
