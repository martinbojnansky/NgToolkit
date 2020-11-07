import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ObservableStore } from 'ng-toolkit-lib';
import { Dataset, Detail } from '../core/models';
import { TodoDetail, TodoSummary } from './models';

export interface TodoState {
  todos: Dataset<TodoSummary>;
  todo: Detail<TodoDetail>;
}

export type TodoAction =
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
export class TodoStore extends ObservableStore<TodoState, TodoAction> {
  constructor() {
    super({}, { log: !environment.production });
  }
}
