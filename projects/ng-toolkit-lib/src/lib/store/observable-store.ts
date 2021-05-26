import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Effects, effects, ObservableUnsubscriber } from '../rxjs';

export type ObservableStoreSnapshot<TState, TAction> = {
  action: TAction;
  state: TState;
};

export type ObservableStoreChange<TState, TAction> = {
  action: TAction;
  state: TState;
  propChanges: ObservableStorePropChanges<TState>;
};

export type ObservableStorePropChanges<TState> = {
  [TProp in keyof TState]: {
    prevValue: TState[TProp];
    nextValue: TState[TProp];
  };
};

export interface ObservableStoreEffects<T, TState, TAction>
  extends Effects<T, void> {
  started?: () => [TAction, Partial<TState>];
  completed?: (v: T) => [TAction, Partial<TState>];
  failed?: (e: Error) => [TAction, Partial<TState>];
  cancelled?: () => [TAction, Partial<TState>];
}

export interface ObservableStoreConfig {
  log?: boolean;
}

export class ObservableStore<TState, TAction> {
  get snapshot(): ObservableStoreSnapshot<TState, TAction> {
    return {
      action: this._change$.value?.action,
      state: this._change$.value?.state,
    };
  }

  get changes$(): Observable<ObservableStoreChange<TState, TAction>> {
    return this._change$.asObservable();
  }

  get config(): ObservableStoreConfig {
    return this._config;
  }

  setState(action: TAction, state: Partial<TState>): void {
    const nextState: TState = state as TState;
    const patch = {};

    const change = this.buildChange(action, patch, nextState);
    this.changeState(change, patch, nextState);
  }

  patchState(action: TAction, patch: Partial<TState>): void {
    const nextState: TState = {
      ...this.snapshot.state,
      ...patch,
    } as TState;

    const change = this.buildChange(action, patch, nextState);
    this.changeState(change, patch, nextState);
  }

  patchStateAsync<T>(
    observable$: Observable<T>,
    storeEffects: ObservableStoreEffects<T, TState, TAction>
  ): Observable<void> {
    return observable$.pipe(
      effects<T>({
        started: () => {
          if (storeEffects.started) {
            const effect = storeEffects.started();
            this.patchState(effect[0], effect[1]);
          }
        },
        completed: (v) => {
          if (storeEffects.completed) {
            const effect = storeEffects.completed(v);
            this.patchState(effect[0], effect[1]);
          }
        },
        failed: (e) => {
          if (storeEffects.failed) {
            const effect = storeEffects.failed(e);
            this.patchState(effect[0], effect[1]);
          }
        },
        cancelled: () => {
          if (storeEffects.cancelled) {
            const effect = storeEffects.cancelled();
            this.patchState(effect[0], effect[1]);
          }
        },
      }),
      map((_) => {})
    );
  }

  protected constructor(
    protected readonly _initialState: Partial<TState> = {},
    protected readonly _config: ObservableStoreConfig = {}
  ) {
    this._change$ = new BehaviorSubject({
      action: null,
      state: _initialState as TState,
      propChanges: null,
    });
  }

  private _change$: BehaviorSubject<ObservableStoreChange<TState, TAction>>;

  private buildChange(
    action: TAction,
    patch: Partial<TState>,
    nextState: TState
  ): ObservableStoreChange<TState, TAction> {
    let props: (keyof TState)[] = patch
      ? (Object.keys(patch) as (keyof TState)[])
      : [];
    if (!props.length) {
      const allProps = [
        ...Object.keys(this.snapshot.state),
        ...Object.keys(nextState),
      ] as (keyof TState)[];
      props = allProps.filter(
        (item, index) => allProps.indexOf(item) === index
      );
    }

    const statePropChanges: ObservableStorePropChanges<TState> = {} as ObservableStorePropChanges<TState>;
    for (const prop of props) {
      if (this.snapshot.state[prop] !== nextState[prop]) {
        statePropChanges[prop] = {
          prevValue: this.snapshot.state[prop],
          nextValue: nextState[prop],
        };
      }
    }

    return {
      action,
      state: nextState,
      propChanges: statePropChanges,
    };
  }

  private changeState(
    change: ObservableStoreChange<TState, TAction>,
    patch: Partial<TState>,
    nextState: TState
  ): void {
    if (this.config.log) {
      console.log({
        action: change.action,
        state: nextState,
        patch,
        propChanges: change.propChanges,
        prevState: this.snapshot.state,
      });
    }

    this._change$.next(change);
  }
}

// tslint:disable:variable-name only-arrow-functions space-before-function-paren ban-types
export function View(): ClassDecorator {
  return (target: Function) => {
    target.prototype._unsubscriber = new ObservableUnsubscriber();

    const ngOnInit: Function = target.prototype.ngOnInit;
    target.prototype.ngOnInit = function (...args: any[]) {
      const changes$Arr: Observable<any>[] = [];
      Object.keys(this).forEach((key) => {
        const property = this[key];
        if (property instanceof ObservableStore) {
          changes$Arr.push(property.changes$);
        } else if (property?.markForCheck) {
          target.prototype._cd = property;
        }
      });

      if (!changes$Arr.length) {
        console.error(
          'At least one ObservableStore has to be injected into the view  ${this.constructor.name}.'
        );
      }

      merge(...changes$Arr)
        .pipe(target.prototype._unsubscriber.onDestroy())
        .subscribe(() => {
          if (target.prototype._cd) {
            target.prototype._cd.markForCheck();
          } else {
            console.error(
              `ChangeDetectorRef has to be injected into the view ${this.constructor.name}.`
            );
          }
        });

      ngOnInit?.apply(this, args);
    };

    const ngOnDestroy: Function = target.prototype.ngOnDestroy;
    target.prototype.ngOnDestroy = function (...args: any[]) {
      target.prototype._unsubscriber.destroy();
      ngOnDestroy?.apply(this, args);
    };
  };
}

export function Service(): ClassDecorator {
  return (target: Function) => {
    target.prototype._unsubscriber = new ObservableUnsubscriber();
    target.prototype._queryResults = {} as { [key: string]: { value: any } };
    target.prototype._subscribed = false as boolean;
    target.prototype._subscribe = (obj: any) => {
      const changes$Arr: Observable<any>[] = [];
      Object.keys(obj).forEach((key) => {
        const prop = obj[key];
        if (prop instanceof ObservableStore) {
          changes$Arr.push(prop.changes$);
        }
      });

      merge(...changes$Arr)
        .pipe(
          target.prototype._unsubscriber.onDestroyOrResubscribe('_subscribe')
        )
        .subscribe(() => {
          target.prototype._queryResults = {};
        });

      target.prototype._subscribed = true;
    };

    const ngOnDestroy: Function = target.prototype.ngOnDestroy;
    target.prototype.ngOnDestroy = function (...args: any[]) {
      target.prototype._unsubscriber.destroy();
      ngOnDestroy?.apply(this, args);
    };
  };
}

export function Query(): (
  target: any,
  prop: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor {
  return function (
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const getter = function get(this: any): any {
      // Hack: Following function makes sure that _queryResults object is cleared
      // on state change, because extending service constructor was not successful.
      if (!target._subscribed) {
        target._subscribe(this);
      }

      if (!target._queryResults[key]) {
        target._queryResults[key] = { value: descriptor.get.apply(this) };
      }

      return target._queryResults[key].value;
    };

    return {
      get: getter,
      configurable: true,
      enumerable: false,
    } as PropertyDescriptor;
  };
}

// tslint:disable:only-arrow-functions space-before-function-paren ban-types
