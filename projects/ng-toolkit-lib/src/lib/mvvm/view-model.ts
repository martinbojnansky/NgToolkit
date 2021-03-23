import { Injectable, OnDestroy, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// tslint:disable:only-arrow-functions
// tslint:disable:space-before-function-paren

@Injectable()
export class ViewModel implements OnDestroy {
  get propertyChanged$() {
    return this._propertyChanged$.asObservable();
  }

  readonly _propertyChanged$: BehaviorSubject<{
    name: string;
    value: any;
    state: { [property: string]: any };
  }> = new BehaviorSubject(
    {} as any // TODO: Load up with initial values
  );

  constructor() {}

  ngOnDestroy(): void {
    this.onDestroy();
  }

  onDestroy(): void {}
}

export function Property<T>() {
  return function (target: T, prop: string | symbol) {
    const key = prop as keyof T;

    const getter = function (this: ViewModel) {
      return this._propertyChanged$.value.state[key as any];
    };

    const setter = function (this: ViewModel, value: any) {
      this._propertyChanged$.next({
        name: key.toString(),
        value,
        state: {
          ...this._propertyChanged$.value.state,
          [key]: value,
        },
      });
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

export function WithParents() {
  return function <T extends new (...args: any[]) => ViewModel>(
    constructor: T
  ) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        args.forEach((arg) => {
          if (arg instanceof ViewModel) {
            arg['_propertyChanged$'].subscribe((pc) => {
              this['_propertyChanged$'].next({
                ...this['_propertyChanged$'].value, // TODO: Update property itself if needed
                name: `${arg.constructor.name}.${pc.name}`,
                value: pc.value,
              });
            }); // TODO: Subscribe only until destroyed
          }
        });
      }
    };
  };
}

export function ParentProperty<
  TViewModel,
  P1 extends keyof TViewModel,
  P2 extends keyof TViewModel[P1]
>(
  type: Type<TViewModel>,
  parentViewModel: P1,
  parentViewModelProperty: P2
): (target: TViewModel, prop: string | symbol) => void;

export function ParentProperty<TViewModel>(
  type: Type<TViewModel>,
  ...props: string[]
) {
  return function (target: TViewModel, prop: string | symbol): void {
    const key = prop as keyof TViewModel;

    const getter = function (this: TViewModel) {
      return this[props[0]][props[1]];
    };

    const setter = function (this: TViewModel, value: any) {
      this[props[0]][props[1]] = value;
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
