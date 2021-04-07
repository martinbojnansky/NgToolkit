import { Injectable } from '@angular/core';
import { ObservableStore } from 'dist/ng-toolkit-lib';
import { Dataset, StoreSampleSummary } from './store-sample-models';

export type StoreSampleState = {
  storeSamples: Dataset<StoreSampleSummary>;
};

export type StoreSampleAction =
  | 'readStoreSamplesStarted'
  | 'readStoreSamplesCompleted'
  | 'readStoreSamplesFailed'
  | 'readStoreSamplesCancelled';

@Injectable()
export class StoreSampleStore extends ObservableStore<
  StoreSampleState,
  StoreSampleAction
> {
  constructor() {
    super({}, { log: true });
  }
}
