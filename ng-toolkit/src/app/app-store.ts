import { ObservableStore } from 'projects/ng-toolkit-lib/src/public-api';
import { TodoAction, TodoState } from './todo/todo-store';

export type AppState = TodoState; // Combine types with "&" operator.

export type AppAction = TodoAction; // Combine types with "|" operator.

export class AppStore extends ObservableStore<AppState, AppAction> {
  constructor() {
    super({}, { log: true });
  }
}
