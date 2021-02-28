import { ObservableStore } from 'ng-toolkit-lib';
import { Dataset } from '../app-models';
import { TodoSummary } from './todo-models';

export type TodoState = {
  todos: Dataset<TodoSummary>;
};

export type TodoAction =
  | 'readTodosStarted'
  | 'readTodosCompleted'
  | 'readTodosFailed'
  | 'readTodosCancelled';

export abstract class TodoStore extends ObservableStore<
  TodoState,
  TodoAction
> {}
