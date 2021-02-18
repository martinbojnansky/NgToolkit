import { TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { effect } from './effect';

describe('Effect', () => {
  const value = 'value';
  const error = 'error';

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  function getObservable(throwsError = false) {
    if (!throwsError) {
      return of(value).pipe(delay(200));
    } else {
      return throwError(error).pipe(delay(200));
    }
  }

  it(
    'should complete',
    waitForAsync(() => {
      let called = 0;
      getObservable()
        .pipe(
          effect(
            (v) => {
              called++;
              expect(v).toBe(value);
            },
            (e) => {
              fail('completed event should be fired instead of failed');
            }
          )
        )
        .subscribe(
          () => {
            expect(called).toBe(1);
          },
          () => {
            fail('complete should be called instead of error');
          },
          () => {
            expect(called).toBe(1);
          }
        );
    })
  );

  it(
    'should fail',
    waitForAsync(() => {
      let called = 0;
      getObservable(true)
        .pipe(
          effect(
            (v) => fail('failed event should be fired instead of completed'),
            (e) => {
              called++;
              expect(e).toBe(error);
            }
          )
        )
        .subscribe(
          () => {
            fail('complete should be called instead of next');
          },
          () => {
            expect(called).toBe(1);
          },
          () => {
            fail('error should be called instead of complete');
          }
        );
    })
  );

  it(
    'should return value',
    waitForAsync(() => {
      getObservable()
        .pipe(
          effect(
            (v) => {
              expect(v).toBe(value);
            },
            (_) => fail('should not fail here')
          )
        )
        .subscribe((v) => {
          expect(typeof v === undefined);
        });
    })
  );
});
