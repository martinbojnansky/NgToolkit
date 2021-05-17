import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { nameof, trySafe } from '../helpers';
import { ObservableUnsubscriber, ReadonlyBehaviorSubject } from '../rxjs';
import { ViewModelContextDirective } from './view-model-context.directive';

@Injectable()
export class ViewModel implements OnDestroy {
  readonly changes$: ReadonlyBehaviorSubject<number> = new BehaviorSubject(0);
  readonly unsubscriber = new ObservableUnsubscriber();

  constructor() {}

  init(this: ViewModel, ...parentViewModels: ViewModel[]): void {
    const propertyObservers: Observable<any>[] = [];

    Object.keys(this).forEach((key) => {
      if ([nameof<ViewModel>('changes$')].includes(key as keyof ViewModel)) {
        return;
      }

      const property = trySafe(() => this[key]);
      // Observe any observable
      if (property instanceof Observable) {
        propertyObservers.push(property);
      }
      // Observe form controls
      else if (
        property instanceof FormGroup ||
        property instanceof FormControl
      ) {
        propertyObservers.push(
          property.valueChanges.pipe(
            tap((v) => {
              // Silent re-emit is needed in order to reflect changes
              // in all [formControl] or [formGroup] bindings.
              property.setValue(v, { emitEvent: false });
            })
          )
        );
      }
      // Observe contexts
      else if (property instanceof ViewModelContextDirective) {
        propertyObservers.push(property.changes$);
      }
    });

    for (const parentViewModel of parentViewModels) {
      if (parentViewModel instanceof ViewModel) {
        propertyObservers.push(parentViewModel.changes$);
      }
    }

    if (!propertyObservers.length) {
      // Emit at least one change when no observable is present on VM.
      // This way will be the template loaded even if the
      // <ng-container *ngIf="changes$ | async">...</ng-container>
      // is used.
      this.emitChange();
      return;
    }

    merge(...propertyObservers)
      .pipe(this.unsubscriber.onDestroy())
      .subscribe(() => {
        this.emitChange();
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber.destroy();
  }

  emitChange(): void {
    (this.changes$ as BehaviorSubject<number>).next(this.changes$.value + 1);
  }

  computed<T>(observable: Observable<T>): ReadonlyBehaviorSubject<T> {
    const subject = new BehaviorSubject<T>(undefined);
    observable
      .pipe(this.unsubscriber.onDestroy())
      .subscribe((v) => subject.next(v));
    return subject;
  }
}
