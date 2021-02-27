import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { trySafe } from '../helpers';

export type ObservableStoreSelect<TState, TAction> = {
  action: TAction;
  props: TState;
  changes$: Observable<ObservableStoreChange<TState, TAction>>;
};

export type ObservableStoreChange<TState, TAction> = {
  action: TAction;
  props: TState;
  propChanges: ObservableStorePropChanges<TState>;
};

export type ObservableStorePropChanges<TState> = {
  [TProp in keyof TState]: {
    prevValue: TState[TProp];
    nextValue: TState[TProp];
  };
};

export type ObservableStateEffects<TState, TPayload> = {
  started?: () => Partial<TState>;
  completed?: (v: TPayload) => Partial<TState>;
  failed?: (e: Error) => Partial<TState>;
  cancelled?: () => Partial<TState>;
};

export interface ObservableStoreConfig {
  log?: boolean;
}

export class ObservableStore<TState, TAction> {
  get snapshot(): ObservableStoreSelect<TState, TAction> {
    return {
      action: this._change$.value?.action,
      props: this._change$.value?.props,
      changes$: this._change$.asObservable(),
    };
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
      ...this.snapshot.props,
      ...patch,
    } as TState;

    const change = this.buildChange(action, patch, nextState);
    this.changeState(change, patch, nextState);
  }

  patchStateAsync<T>(
    action: TAction,
    observable: Observable<T>,
    effects: ObservableStateEffects<TState, T>
  ): Observable<void> {
    const actionBaseName = action
      .toString()
      .replace(/(Started|Completed|Failed|Cancelled)$/, '');
    const actionNames = ([
      `${actionBaseName}Started`,
      `${actionBaseName}Completed`,
      `${actionBaseName}Failed`,
      `${actionBaseName}Cancelled`,
    ] as any) as TAction[];

    let isCompleted: boolean;

    return of(1).pipe(
      tap(() => {
        this.patchState(
          actionNames[0],
          trySafe(() => effects.started())
        );
        isCompleted = false;
      }),
      switchMap(() => observable),
      tap(
        (v) => {
          this.patchState(
            actionNames[1],
            trySafe(() => effects.completed(v))
          );
          isCompleted = true;
        },
        (e) => {
          this.patchState(
            actionNames[2],
            trySafe(() => effects.failed(e))
          );
          isCompleted = true;
        }
      ),
      map((_) => {}),
      finalize(() => {
        if (!isCompleted) {
          this.patchState(
            actionNames[3],
            trySafe(() => effects.cancelled())
          );
        }
      })
    );
  }

  protected constructor(
    private readonly _initialState: Partial<TState> = {},
    private readonly _config: ObservableStoreConfig = {}
  ) {
    this._change$ = new BehaviorSubject({
      action: null,
      props: _initialState as TState,
      propChanges: null,
    });
  }

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
        ...Object.keys(this.snapshot.props),
        ...Object.keys(nextState),
      ] as (keyof TState)[];
      props = allProps.filter(
        (item, index) => allProps.indexOf(item) === index
      );
    }

    const statePropChanges: ObservableStorePropChanges<TState> = {} as ObservableStorePropChanges<TState>;
    for (const prop of props) {
      if (this.snapshot.props[prop] !== nextState[prop]) {
        statePropChanges[prop] = {
          prevValue: this.snapshot.props[prop],
          nextValue: nextState[prop],
        };
      }
    }

    return {
      action,
      props: nextState,
      propChanges: statePropChanges,
    };
  }

  private _change$: BehaviorSubject<ObservableStoreChange<TState, TAction>>;

  private changeState(
    change: ObservableStoreChange<TState, TAction>,
    patch: Partial<TState>,
    nextState: TState
  ): void {
    if (this.config.log) {
      console.log({
        action: change.action,
        props: nextState,
        patch,
        propChanges: change.propChanges,
        prevProps: this.snapshot.props,
      });
    }

    this._change$.next(change);
  }
}

export class ObservableStoreQueries<TState, TAction> {
  get props(): TState {
    return this.store.snapshot.props;
  }

  get changes$(): Observable<ObservableStoreChange<TState, TAction>> {
    return this.store.snapshot.changes$;
  }

  constructor(protected store: ObservableStore<TState, TAction>) {}
}
