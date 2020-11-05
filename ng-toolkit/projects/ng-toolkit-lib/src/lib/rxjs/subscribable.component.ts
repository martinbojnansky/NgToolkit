import { OnDestroy, Component } from '@angular/core';
import { Observable, PartialObserver, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'subscribable-component',
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

  protected subscribeSingle<T>(
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

  protected subscribeEach<T>(
    key: string,
    observable: Observable<T>,
    observer: PartialObserver<T>
  ) {
    this._subscribtions[key] = observable
      .pipe(takeUntil(this._ngOnDestroy$))
      .subscribe(observer);
  }

  private _ngOnDestroy$ = new Subject();
  private _subscribtions: { [key: string]: Subscription } = {};
}
