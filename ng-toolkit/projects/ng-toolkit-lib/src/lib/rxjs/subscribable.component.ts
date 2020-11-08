import { Component, OnDestroy } from '@angular/core';
import { Observable, PartialObserver, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'atl-subscribable-component',
  template: '',
})
export class SubscribableComponent implements OnDestroy {
  protected get subscriptions() {
    return this._subscribtions;
  }

  ngOnDestroy() {
    this._ngOnDestroy$.next();
    this._ngOnDestroy$.complete();
  }

  isSubscriptionInProgress(key: string): boolean {
    const subscription = this.subscriptions[key];
    return subscription && !subscription.closed;
  }

  protected subscribeSafe<T>(
    key: string,
    observable: Observable<T>,
    observer: PartialObserver<T>
  ) {
    if (this._subscribtions[key]) {
      this._subscribtions[key].unsubscribe();
    }

    this._subscribtions[key] = observable
      .pipe(takeUntil(this._ngOnDestroy$))
      .subscribe(observer);
  }

  private _ngOnDestroy$ = new Subject();
  private _subscribtions: { [key: string]: Subscription } = {};
}
