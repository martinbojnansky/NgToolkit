import { ObservableStore } from 'projects/ng-toolkit-lib/src/public-api';
import { TodoAction, TodoState } from './todo/todo-store';

export type AppState = TodoState; // & ModuleState

export type AppAction = TodoAction; // | ModuleAction

export class AppStore extends ObservableStore<AppState, AppAction> {
  constructor() {
    super({}, { log: true });
  }
}
