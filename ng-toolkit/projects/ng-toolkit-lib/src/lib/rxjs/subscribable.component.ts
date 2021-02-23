import { Component, OnDestroy } from '@angular/core';
import { Observable, PartialObserver, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngt-subscribable-component',
  template: '',
})
export class SubscribableComponent implements OnDestroy {
  protected get subscriptions() {
    return this._subscriptions;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  protected subscribed(key: string): boolean {
    const subscription = this.subscriptions[key];
    return subscription && !subscription.closed;
  }

  protected subscribeSafe<T>(
    key: string,
    observable: Observable<T>,
    observer: PartialObserver<T>
  ) {
    if (this._subscriptions[key]) {
      this._subscriptions[key].unsubscribe();
    }

    this._subscriptions[key] = observable
      .pipe(takeUntil(this.destroyed$))
      .subscribe(observer);
  }

  private destroyed$ = new Subject();
  private _subscriptions: { [key: string]: Subscription } = {};
}
