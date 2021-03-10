import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Effects, effects } from '../rxjs';

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
    private readonly _initialState: Partial<TState> = {},
    private readonly _config: ObservableStoreConfig = {}
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

export class ObservableStoreQueries<TState, TAction> {
  protected _queryResults: { [key: string]: { value: any } } = {};

  get state(): TState {
    return this.store.snapshot.state;
  }

  get changes$(): Observable<ObservableStoreChange<TState, TAction>> {
    return this.store.changes$;
  }

  constructor(protected store: ObservableStore<TState, TAction>) {
    store.changes$.subscribe(() => {
      this._queryResults = {};
    });
  }
}

export function query<TState, TAction>(): (
  target: ObservableStoreQueries<TState, TAction>,
  prop: string | Symbol,
  descriptor: PropertyDescriptor
) => PropertyDescriptor {
  return (
    target: ObservableStoreQueries<TState, TAction>,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    return {
      get: function (this: ObservableStoreQueries<TState, TAction>): any {
        console.log(this._queryResults[key]?.value);
        if (!this._queryResults[key]) {
          this._queryResults[key] = { value: descriptor.get.apply(this) };
        }
        return this._queryResults[key].value;
      },
      configurable: false,
      enumerable: false,
    } as PropertyDescriptor;
  };
}
