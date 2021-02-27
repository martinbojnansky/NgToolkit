import { ObservableStore } from 'projects/ng-toolkit-lib/src/public-api';
import { Dataset, Detail } from '../core/models';
import { TodoDetail, TodoSummary } from './models';

export type TodoState = {
  todos: Dataset<TodoSummary>;
  todo: Detail<TodoDetail>;
};

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

export abstract class TodoStore extends ObservableStore<
  TodoState,
  TodoAction
> {}
