import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { trySafe } from '../helpers';
import { effect } from './effect';

export interface ObservableStoreConfig {
  log?: boolean;
}

export interface ObservableStateChange<TState, TAction> {
  action: TAction;
  propChanges: ObservableStatePropChanges<TState>;
}

export type ObservableStatePropChanges<TState> = {
  [TProp in keyof TState]: {
    prevValue: TState[TProp];
    nextValue: TState[TProp];
  };
};

export interface ObservableStateEffects<TState, TPayload> {
  started?: () => Partial<TState>;
  completed?: (v: TPayload) => Partial<TState>;
  failed?: (e: Error) => Partial<TState>;
  cancelled?: () => Partial<TState>;
}

export enum AsyncActionSuffix {
  started = 'Started',
  completed = 'Completed',
  failed = 'Failed',
  cancelled = 'Cancelled',
}

export const asyncAction = <TAction>(action: TAction) => {
  return {
    started: `${action}${AsyncActionSuffix.started}`,
    completed: `${action}${AsyncActionSuffix.completed}`,
    failed: `${action}${AsyncActionSuffix.failed}`,
    cancelled: `${action}${AsyncActionSuffix.cancelled}`,
  };
};

export class ObservableStore<TState, TAction> {
  get state(): Readonly<TState> {
    return this._state$.getValue();
  }

  get state$(): Observable<Readonly<TState>> {
    return this._state$.asObservable();
  }

  get stateChange(): ObservableStateChange<TState, TAction> {
    return this._stateChange;
  }

  get stateChange$(): Observable<ObservableStateChange<TState, TAction>> {
    return this._stateChange$.asObservable();
  }

  get config(): ObservableStoreConfig {
    return this._config;
  }

  setState(action: TAction, state: Partial<TState>): void {
    const nextState: TState = state as TState;
    const patch = {};
    const stateChange = this.buildStateChange(action, patch, nextState);
    this.changeState(stateChange, patch, nextState);
  }

  patchState(action: TAction, patch: Partial<TState>): void {
    const nextState: TState = {
      ...this.state,
      ...patch,
    } as TState;
    const stateChange = this.buildStateChange(action, patch, nextState);

    this.changeState(stateChange, patch, nextState);
  }

  patchStateAsync<T>(
    action: TAction,
    observable: Observable<T>,
    effects: ObservableStateEffects<TState, T>
  ): Observable<void> {
    let isCompleted: boolean;
    const actions = asyncAction(action);

    return of(1).pipe(
      tap(() => {
        this.patchState(
          actions.started as any,
          trySafe(() => effects.started())
        );
        isCompleted = false;
      }),
      switchMap(() => observable),
      effect(
        (v) => {
          this.patchState(
            actions.completed as any,
            trySafe(() => effects.completed(v))
          );
          isCompleted = true;
        },
        (e) =>
          this.patchState(
            actions.failed as any,
            trySafe(() => effects.failed(e))
          )
      ),
      finalize(() => {
        if (!isCompleted) {
          this.patchState(
            actions.cancelled as any,
            trySafe(() => effects.cancelled())
          );
        }
      })
    );
  }

  protected constructor(
    protected initialState: Partial<TState> = {},
    private _config: ObservableStoreConfig = {}
  ) {
    this._stateChange$ = new Subject();
    this._state$ = new BehaviorSubject(initialState as TState);
  }

  protected buildStateChange(
    action: TAction,
    patch: Partial<TState>,
    nextState: TState
  ): ObservableStateChange<TState, TAction> {
    let props: (keyof TState)[] = patch
      ? (Object.keys(patch) as (keyof TState)[])
      : [];
    if (!props.length) {
      const allProps = [
        ...Object.keys(this.state),
        ...Object.keys(nextState),
      ] as (keyof TState)[];
      props = allProps.filter(
        (item, index) => allProps.indexOf(item) === index
      );
    }

    const statePropChanges: ObservableStatePropChanges<TState> = {} as ObservableStatePropChanges<
      TState
    >;
    for (const prop of props) {
      if (this.state[prop] !== nextState[prop]) {
        statePropChanges[prop] = {
          prevValue: this.state[prop],
          nextValue: nextState[prop],
        };
      }
    }

    return {
      action,
      propChanges: statePropChanges,
    };
  }

  private _stateChange: ObservableStateChange<TState, TAction>;
  private _stateChange$: Subject<ObservableStateChange<TState, TAction>>;
  private _state$: BehaviorSubject<Readonly<TState>>;

  private changeState(
    stateChange: ObservableStateChange<TState, TAction>,
    patch: Partial<TState>,
    nextState: TState
  ): void {
    if (this.config.log) {
      console.log({
        action: stateChange.action,
        patch,
        nextState,
        prevState: this.state,
        propChanges: stateChange.propChanges,
      });
    }

    if (patch) {
      this._state$.next(nextState);
    }

    this._stateChange = stateChange;
    this._stateChange$.next(stateChange);
  }
}
