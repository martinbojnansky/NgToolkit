import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ObservableUnsubscriber } from '../rxjs';

// tslint:disable:only-arrow-functions
// tslint:disable:space-before-function-paren

@Injectable()
export class ViewModel implements OnDestroy {
  changes$ = new BehaviorSubject(0);

  constructor() {}

  ngOnDestroy(): void {
    this.onDestroy();
    this.unsubscriber.destroy();
  }

  onInit(): void {}
  onDestroy(): void {}

  readonly unsubscriber = new ObservableUnsubscriber();
}

export function Property<T>() {
  return function (target: T, prop: string | symbol) {
    const key = prop as keyof T;

    const getter = function (this: ViewModel) {
      return target[key];
    };

    const setter = function (this: ViewModel, v: any) {
      target[key] = v;
      if (v instanceof FormGroup || v instanceof FormControl) {
        v.valueChanges.subscribe((v) => {
          console.log('changed', target, prop, this, v);
          this.changes$.next(this.changes$.value + 1);
        });
      }
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

// tslint:enable:only-arrow-functions
// tslint:enable:space-before-function-paren
