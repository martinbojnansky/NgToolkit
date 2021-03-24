import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { nameof, trySafe } from '../helpers';
import { ObservableUnsubscriber } from '../rxjs';

@Injectable()
export class ViewModel implements OnDestroy {
  readonly changes$ = new BehaviorSubject(1);
  readonly unsubscriber = new ObservableUnsubscriber();

  constructor() {}

  observeProperties(this: ViewModel, ...parentViewModels: ViewModel[]): void {
    Object.keys(this).forEach((key) => {
      const property = trySafe(() => this[key]);
      if (
        ![nameof<ViewModel>('changes$').toString()].includes(key) &&
        property &&
        property instanceof Observable
      ) {
        this[key].pipe(this.unsubscriber.onDestroy()).subscribe(() => {
          this.changes$.next(this.changes$.value + 1);
        });
      }
    });

    for (const parentViewModel of parentViewModels) {
      if (parentViewModel instanceof ViewModel) {
        parentViewModel.changes$
          .pipe(this.unsubscriber.onDestroy())
          .subscribe(() => {
            this.changes$.next(this.changes$.value + 1);
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber.destroy();
  }
}
