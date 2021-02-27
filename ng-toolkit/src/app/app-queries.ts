import { ObservableStoreQueries } from 'projects/ng-toolkit-lib/src/public-api';
import { Dataset, Detail } from './core/models';

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

  detailEnabled<T>(detail: Detail<T>): boolean {
    return detail?.item && !detail?.isBusy;
  }

  detailDisabled<T>(detail: Detail<T>): boolean {
    return !this.detailEnabled(detail);
  }
}
