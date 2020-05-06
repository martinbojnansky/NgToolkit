import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export abstract class SubscribableComponent implements OnDestroy {
  ngOnDestroy() {
    this._ngOnDestroy$.next();
    this._ngOnDestroy$.complete();
  }

  // tslint:disable-next-line: variable-name
  protected _ngOnDestroy$ = new Subject();

  protected untilDestroyed<T>() {
    return takeUntil<T>(this._ngOnDestroy$);
  }

  protected get ngOnDestroy$() {
    return this._ngOnDestroy$.asObservable();
  }
}
