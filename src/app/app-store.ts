import { ObservableStore } from 'ng-toolkit-lib';
import {
  StoreSampleAction,
  StoreSampleState,
} from './store-sample/store-sample-store';

export type AppState = StoreSampleState; // Combine types with "&" operator.

export type AppAction = StoreSampleAction; // Combine types with "|" operator.

export class AppStore extends ObservableStore<AppState, AppAction> {
  constructor() {
    super({}, { log: true });
  }
}
