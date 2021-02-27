import { of, OperatorFunction, Subject } from 'rxjs';
import { filter, skip, switchMap, takeUntil, tap } from 'rxjs/operators';

export class ObservableUnsubscriber<T> {
  onDestroy<R>(): OperatorFunction<R, R> {
    return (observable$) => observable$.pipe(takeUntil(this.destroyed$));
  }

  onResubscribe<R>(subscription: T): OperatorFunction<R, R> {
    return (observable$) =>
      of(1).pipe(
        tap(() => {
          this.subscribed$.next(subscription);
        }),
        switchMap(() => observable$),
        takeUntil(
          this.subscribed$.pipe(
            filter((k) => k === subscription),
            skip(1)
          )
        )
      );
  }

  onDestroyOrResubscribe<R>(subscription: T): OperatorFunction<R, R> {
    return (observable$) =>
      observable$.pipe(this.onDestroy(), this.onResubscribe(subscription));
  }

  destroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.subscribed$.complete();
  }

  private subscribed$ = new Subject();
  private destroyed$ = new Subject();
}
