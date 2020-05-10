import { OnDestroy } from '@angular/core';
import { Observable, PartialObserver, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export abstract class SubscribableComponent implements OnDestroy {
  ngOnDestroy() {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }

  protected subscribeSafe<T>(
    key: string,
    observable: Observable<T>,
    observer: PartialObserver<T>
  ) {
    if (this.subscribtions[key]) {
      this.subscribtions[key].unsubscribe();
    }

    this.subscribtions[key] = observable
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(observer);
  }

  private ngOnDestroy$ = new Subject();
  private subscribtions: { [key: string]: Subscription } = {};
}
