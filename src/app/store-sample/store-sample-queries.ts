import { Injectable } from '@angular/core';
import { ObservableStoreQueries } from 'ng-toolkit-lib';
import { Dataset } from '../app-models';
import {
  StoreSampleAction,
  StoreSampleState,
  StoreSampleStore,
} from './store-sample-store';

@Injectable()
export class StoreSampleQueries extends ObservableStoreQueries<
  StoreSampleState,
  StoreSampleAction
> {
  constructor(protected store: StoreSampleStore) {
    super(store);
  }

  datasetEmpty<T>(dataset: Dataset<T>): boolean {
    return !dataset?.items?.length;
  }

  datasetNotEmpty<T>(dataset: Dataset<T>): boolean {
    return !this.datasetEmpty(dataset);
  }
}
