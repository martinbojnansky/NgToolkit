import { Injectable } from '@angular/core';
import { uuid } from 'dist/ng-toolkit-lib';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { StoreSampleSummary } from '../store-sample-models';
import { StoreSampleStore } from '../store-sample-store';

export abstract class StoreSampleService {
  abstract readItems(): Observable<void>;
}

@Injectable()
export class StoreSampleServiceImpl extends StoreSampleService {
  constructor(protected storeSampleStore: StoreSampleStore) {
    super();
  }

  readItems() {
    return this.storeSampleStore.patchStateAsync(getFakeStoreSamples(), {
      started: () => [
        'readStoreSamplesStarted',
        {
          storeSamples: {
            ...this.storeSampleStore.snapshot.state.storeSamples,
            busy: true,
            error: null,
          },
        },
      ],
      completed: (v) => [
        'readStoreSamplesCompleted',
        {
          storeSamples: {
            ...this.storeSampleStore.snapshot.state.storeSamples,
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
            ...this.storeSampleStore.snapshot.state.storeSamples,
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
  ] as StoreSampleSummary[]).pipe(delay(1500));
};
