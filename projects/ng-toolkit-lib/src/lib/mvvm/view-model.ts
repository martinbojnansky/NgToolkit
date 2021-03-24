import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { nameof, trySafe } from '../helpers';
import { ObservableUnsubscriber } from '../rxjs';

@Injectable()
export class ViewModel implements OnDestroy {
  readonly changes$ = new BehaviorSubject(0);
  readonly unsubscriber = new ObservableUnsubscriber();

  constructor() {}

  init(this: ViewModel, ...parentViewModels: ViewModel[]): void {
    const propertyObservers: Observable<any>[] = [];

    Object.keys(this).forEach((key) => {
      if ([nameof<ViewModel>('changes$')].includes(key as keyof ViewModel)) {
        return;
      }

      const property = trySafe(() => this[key]);
      if (property instanceof Observable) {
        propertyObservers.push(property);
      } else if (
        property instanceof FormGroup ||
        property instanceof FormControl
      ) {
        propertyObservers.push(property.valueChanges);
      }
    });

    for (const parentViewModel of parentViewModels) {
      if (parentViewModel instanceof ViewModel) {
        propertyObservers.push(parentViewModel.changes$);
      }
    }

    merge(...propertyObservers)
      .pipe(this.unsubscriber.onDestroy())
      .subscribe(() => {
        this.changes$.next(this.changes$.value + 1);
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber.destroy();
  }
}
