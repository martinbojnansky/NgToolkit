import { Injectable } from '@angular/core';
import { ObservableStoreQueries, query } from 'ng-toolkit-lib';
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

  @query()
  get storeSamplesNotEmpty(): boolean {
    return this.datasetNotEmpty(this.state.storeSamples);
  }

  protected datasetEmpty<T>(dataset: Dataset<T>): boolean {
    return !dataset?.items?.length;
  }

  protected datasetNotEmpty<T>(dataset: Dataset<T>): boolean {
    return !this.datasetEmpty(dataset);
  }
}
