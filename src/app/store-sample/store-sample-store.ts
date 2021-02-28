import { ObservableStore } from 'dist/ng-toolkit-lib';
import { Dataset } from '../app-models';
import { StoreSampleSummary } from './store-sample-models';

export type StoreSampleState = {
  storeSamples: Dataset<StoreSampleSummary>;
};

export type StoreSampleAction =
  | 'readStoreSamplesStarted'
  | 'readStoreSamplesCompleted'
  | 'readStoreSamplesFailed'
  | 'readStoreSamplesCancelled';

export abstract class StoreSampleStore extends ObservableStore<
  StoreSampleState,
  StoreSampleAction
> {}
