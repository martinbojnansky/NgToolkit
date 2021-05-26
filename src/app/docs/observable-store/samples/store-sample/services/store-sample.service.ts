import { Injectable, OnDestroy } from '@angular/core';
import { Query, Service, uuid } from 'dist/ng-toolkit-lib';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Dataset, StoreSampleSummary } from '../store-sample-models';
import { StoreSampleStore } from '../store-sample-store';

export abstract class StoreSampleService {
  abstract get storeSamples(): Dataset<StoreSampleSummary>;
  abstract get storeSamplesNotEmpty(): boolean;

  abstract readItems(): Observable<void>;
}

@Injectable()
@Service()
export class StoreSampleServiceImpl implements OnDestroy {
  @Query()
  get storeSamples(): Dataset<StoreSampleSummary> {
    return this.store.snapshot.state.storeSamples;
  }

  @Query()
  get storeSamplesNotEmpty(): boolean {
    return !!this.store.snapshot.state?.storeSamples?.items?.length;
  }

  constructor(protected store: StoreSampleStore) {}

  ngOnDestroy(): void {}

  readItems() {
    return this.store.patchStateAsync(getFakeStoreSamples(), {
      started: () => [
        'readStoreSamplesStarted',
        {
          storeSamples: {
            ...this.store.snapshot.state.storeSamples,
            busy: true,
            error: null,
          },
        },
      ],
      completed: (v) => [
        'readStoreSamplesCompleted',
        {
          storeSamples: {
            ...this.store.snapshot.state.storeSamples,
            busy: false,
            error: null,
            items: v,
          },
        },
      ],
      failed: (e) => [
        'readStoreSamplesFailed',
        {
          storeSamples: {
            ...this.store.snapshot.state.storeSamples,
            busy: false,
            error: {
              ...e,
              message: `StoreSamples could not be loaded. ${e.message}`,
            },
          },
        },
      ],
      cancelled: () => ['readStoreSamplesCancelled', null],
    });
  }
}

const getFakeStoreSamples = () => {
  return of([
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
  ] as StoreSampleSummary[]).pipe(delay(3000));
};
