import { Injectable } from '@angular/core';
import { ObservableStoreQueries } from 'dist/ng-toolkit-lib';
import { AppAction, AppState } from './app-store';

@Injectable()
export class AppQueries extends ObservableStoreQueries<AppState, AppAction> {}
