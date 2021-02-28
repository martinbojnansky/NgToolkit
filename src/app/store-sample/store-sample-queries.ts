import { Injectable } from '@angular/core';
import { AppQueries } from '../app-queries';
import {
  StoreSampleAction,
  StoreSampleState,
  StoreSampleStore,
} from './store-sample-store';

@Injectable()
export class StoreSampleQueries extends AppQueries<
  StoreSampleState,
  StoreSampleAction
> {
  constructor(protected store: StoreSampleStore) {
    super(store);
  }
}
