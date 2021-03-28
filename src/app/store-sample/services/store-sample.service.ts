import { Injectable } from '@angular/core';
import { uuid } from 'dist/ng-toolkit-lib';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { StoreSampleSummary } from '../store-sample-models';
import { StoreSampleQueries } from '../store-sample-queries';

export abstract class StoreSampleService {
  abstract readItems(): Observable<void>;
}

@Injectable()
export class StoreSampleServiceImpl extends StoreSampleService {
  constructor(protected storeSampleQueries: StoreSampleQueries) {
    super();
  }

  readItems() {
    return this.storeSampleQueries.patchStateAsync(getFakeStoreSamples(), {
      started: () => [
        'readStoreSamplesStarted',
        {
          storeSamples: {
            ...this.storeSampleQueries.state.storeSamples,
            busy: true,
            error: null,
          },
        },
      ],
      completed: (v) => [
        'readStoreSamplesCompleted',
        {
          storeSamples: {
            ...this.storeSampleQueries.state.storeSamples,
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
            ...this.storeSampleQueries.state.storeSamples,
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
