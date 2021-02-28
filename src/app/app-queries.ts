import { ObservableStoreQueries } from 'ng-toolkit-lib';
import { Dataset } from './app-models';

export abstract class AppQueries<
  TState,
  TAction
> extends ObservableStoreQueries<TState, TAction> {
  datasetEmpty<T>(dataset: Dataset<T>): boolean {
    return !dataset?.items?.length;
  }

  datasetNotEmpty<T>(dataset: Dataset<T>): boolean {
    return !this.datasetEmpty(dataset);
  }
}
