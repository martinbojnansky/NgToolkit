import { of, OperatorFunction } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';

export type Effects<T, R> = {
  started?: () => R;
  completed?: (v: T) => R;
  failed?: (e: Error) => R;
  cancelled?: () => R;
};

export function effects<T>(ef: Effects<T, void>): OperatorFunction<T, T> {
  let isCompleted: boolean;
  return (observable$) =>
    of(1).pipe(
      tap(() => {
        if (ef.started) {
          ef.started();
        }
        isCompleted = false;
      }),
      switchMap(() => observable$),
      tap(
        (n) => {
          if (ef.completed) {
            ef.completed(n);
          }
          isCompleted = true;
        },
        (e) => {
          if (ef.failed) {
            ef.failed(e);
          }
          isCompleted = true;
        }
      ),
      finalize(() => {
        if (!isCompleted) {
          if (ef.completed) {
            ef.cancelled();
          }
        }
      })
    );
}
