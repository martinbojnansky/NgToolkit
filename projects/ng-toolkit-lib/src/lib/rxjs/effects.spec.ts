import { TestBed, waitForAsync } from '@angular/core/testing';
import { effects } from 'ng-toolkit-lib';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

describe('Effects', () => {
  let startedSpy: jasmine.Spy<() => void>;
  let completedSpy: jasmine.Spy<(result: string) => void>;
  let failedSpy: jasmine.Spy<(err: Error) => void>;
  let cancelledSpy: jasmine.Spy<() => void>;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    startedSpy = jasmine.createSpy('started', () => {});
    completedSpy = jasmine.createSpy('completed', (result) => {});
    failedSpy = jasmine.createSpy('failed', (err) => {});
    cancelledSpy = jasmine.createSpy('cancelled', () => {});
  });

  it(
    'should started',
    waitForAsync(() => {
      of('done')
        .pipe(
          effects({
            started: startedSpy,
            completed: completedSpy,
            failed: failedSpy,
            cancelled: cancelledSpy,
          })
        )
        .subscribe();
      expect(startedSpy).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should complete',
    waitForAsync(() => {
      of('done')
        .pipe(delay(300))
        .pipe(
          effects({
            started: startedSpy,
            completed: completedSpy,
            failed: failedSpy,
            cancelled: cancelledSpy,
          })
        )
        .subscribe({
          next: (value) => {
            expect(value).toEqual('done');
          },
          complete: () => {
            expect(startedSpy).toHaveBeenCalledTimes(1);
            expect(completedSpy).toHaveBeenCalledTimes(1);
            expect(failedSpy).toHaveBeenCalledTimes(0);
            expect(cancelledSpy).toHaveBeenCalledTimes(0);

            expect(completedSpy).toHaveBeenCalledWith('done');
          },
        });
    })
  );

  it(
    'should call failed',
    waitForAsync(() => {
      const error = new Error('test error');
      of('done')
        .pipe(
          delay(300),
          map((value) => {
            throw error;
          })
        )
        .pipe(
          effects({
            started: startedSpy,
            completed: completedSpy,
            failed: failedSpy,
            cancelled: cancelledSpy,
          })
        )
        .subscribe({
          error: (err) => {
            expect(err).toEqual(error);
          },
          complete: () => {
            expect(startedSpy).toHaveBeenCalledTimes(1);
            expect(completedSpy).toHaveBeenCalledTimes(0);
            expect(failedSpy).toHaveBeenCalledTimes(1);
            expect(cancelledSpy).toHaveBeenCalledTimes(0);

            expect(failedSpy).toHaveBeenCalledWith(error);
          },
        });
    })
  );

  it(
    'should call cancelled',
    waitForAsync(() => {
      const subscription = of('done')
        .pipe(delay(10000))
        .pipe(
          effects({
            started: startedSpy,
            completed: completedSpy,
            failed: failedSpy,
            cancelled: cancelledSpy,
          })
        )
        .subscribe({
          complete: () => {
            expect(startedSpy).toHaveBeenCalledTimes(1);
            expect(completedSpy).toHaveBeenCalledTimes(0);
            expect(failedSpy).toHaveBeenCalledTimes(0);
            expect(cancelledSpy).toHaveBeenCalledTimes(1);
          },
        });
      setTimeout(() => subscription.unsubscribe(), 300);
    })
  );

  it(
    'should complete without effects',
    waitForAsync(() => {
      of('done')
        .pipe(effects({}))
        .subscribe({
          complete: () => {
            expect(true).toBeTruthy();
          },
        });
    })
  );
});
