import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { effects } from './effects';
import { ObservableUnsubscriber } from './observable-unsubscriber';

describe('ObservableUnsubscriber', () => {
  let unsubscriber: ObservableUnsubscriber<'key1' | 'key2'>;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    unsubscriber = new ObservableUnsubscriber();
  });

  it(
    'should unsubscribe on destroy',
    waitForAsync(() => {
      of('done')
        .pipe(
          delay(10000),
          effects({
            cancelled: () => {
              expect(true).toBeTruthy();
            },
          }),
          unsubscriber.onDestroy()
        )
        .subscribe();
      unsubscriber.destroy();
    })
  );

  it(
    'should be cancelled on resubscribe',
    waitForAsync(() => {
      let started = 0;
      let cancelled = 0;
      let completed = 0;
      let completedWith: string;

      const subscribe = (result: string) =>
        of(result).pipe(
          delay(300),
          effects({
            started: () => {
              started++;
            },
            cancelled: () => {
              cancelled++;
            },
            completed: (value) => {
              completed++;
              completedWith = value;
            },
          }),
          unsubscriber.onDestroyOrResubscribe('key1')
        );

      subscribe('1').subscribe({
        next: () => {
          fail(new Error('Should not emit next.'));
        },
        complete: () => {
          expect(true).toBeTruthy();
        },
      });
      subscribe('2').subscribe({
        next: () => {
          fail(new Error('Should not emit next.'));
        },
        complete: () => {
          expect(true).toBeTruthy();
        },
      });
      subscribe('3').subscribe({
        complete: () => {
          expect(started).toEqual(3);
          expect(cancelled).toEqual(2);
          expect(completed).toEqual(1);
          expect(completedWith).toEqual('3');
        },
      });
    })
  );
});
