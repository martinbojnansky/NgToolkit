import { Injectable } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ObservableStateChange, ObservableStore } from './observable-store';

export interface TestState {
  firstName: string;
  lastName: string;
}

export type TestAction =
  | 'patchWholeState'
  | 'patchPartialState'
  | 'setState'
  | 'null';

export const initialState: TestState = {
  firstName: 'John',
  lastName: 'Doe',
};

export const newState: TestState = {
  firstName: 'John',
  lastName: 'Smith',
};

export interface TestStateChange
  extends ObservableStateChange<TestState, TestAction> {}

@Injectable()
export class TestStore extends ObservableStore<TestState, TestAction> {
  constructor() {
    super(initialState);
  }
}

describe('ObservableStore', () => {
  let store: TestStore;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TestStore] });
    store = TestBed.inject(TestStore);
  });

  function patchWholeState(): void {
    store.patchState('patchWholeState', {
      ...store.state,
      lastName: newState.lastName,
    });
  }

  function patchPartialState(): void {
    store.patchState('patchPartialState', {
      lastName: newState.lastName,
    });
  }

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should return initial state', () => {
    expect(store.state).toBe(initialState);
  });

  it(
    'should patch whole state',
    waitForAsync(() => {
      store.stateChange$.subscribe((change) => {
        const expectedChange = {
          action: 'patchWholeState',
          propChanges: {
            lastName: {
              prevValue: initialState.lastName,
              nextValue: newState.lastName,
            },
          },
        } as TestStateChange;
        expect(change).toEqual(expectedChange);
        expect(store.stateChange).toEqual(expectedChange);
      });

      patchWholeState();
      expect(store.state).not.toBe(newState);
      expect(store.state).toEqual(newState);
    })
  );

  it(
    'should patch partial state',
    waitForAsync(() => {
      store.stateChange$.subscribe((change) => {
        const expectedChange = {
          action: 'patchPartialState',
          propChanges: {
            lastName: {
              prevValue: initialState.lastName,
              nextValue: newState.lastName,
            },
          },
        } as TestStateChange;
        expect(change).toEqual(expectedChange);
        expect(store.stateChange).toEqual(expectedChange);
      });

      patchPartialState();
      expect(store.state).not.toBe(newState);
      expect(store.state).toEqual(newState);
    })
  );

  it(
    'should emmit only change when patch is null',
    waitForAsync(() => {
      let actionCalled = 0;
      let stateCalled = -1; // State is of type BehaviorSubject which will be called at least once on subscribe.

      store.stateChange$.subscribe((change) => {
        actionCalled++;
        const expectedChange = {
          action: 'null',
          propChanges: {},
        } as TestStateChange;
        expect(change).toEqual(expectedChange);
        expect(store.stateChange).toEqual(expectedChange);
      });
      store.state$.subscribe((state: TestState) => {
        stateCalled++;
        expect(store.state).toBe(state);
      });

      store.patchState('null', null);

      expect(actionCalled).toBe(1);
      expect(stateCalled).toBe(0);
    })
  );

  it(
    'should set empty state',
    waitForAsync(() => {
      store.stateChange$.subscribe((change) => {
        const expectedChange = {
          action: 'setState',
          propChanges: {
            firstName: {
              prevValue: initialState.firstName,
              nextValue: undefined,
            },
            lastName: {
              prevValue: initialState.lastName,
              nextValue: undefined,
            },
          },
        } as TestStateChange;
        expect(change).toEqual(expectedChange);
        expect(store.stateChange).toEqual(expectedChange);
      });

      expect(store.state).toBe(initialState);
      store.setState('setState', {});
      expect(store.state.firstName).toBeUndefined();
      expect(store.state.lastName).toBeUndefined();
    })
  );

  it(
    'should set partial state',
    waitForAsync(() => {
      store.stateChange$.subscribe((change) => {
        const expectedChange = {
          action: 'setState',
          propChanges: {
            firstName: {
              prevValue: initialState.firstName,
              nextValue: undefined,
            },
            lastName: {
              prevValue: initialState.lastName,
              nextValue: newState.lastName,
            },
          },
        } as TestStateChange;
        expect(change).toEqual(expectedChange);
        expect(store.stateChange).toEqual(expectedChange);
      });

      expect(store.state).toBe(initialState);
      store.setState('setState', { lastName: newState.lastName });
      expect(store.state.firstName).toBeUndefined();
      expect(store.state.lastName).toBe(newState.lastName);
    })
  );

  it(
    'should set partial state',
    waitForAsync(() => {
      store.setState('setState', {});
      expect(store.state).toEqual({} as any);

      store.stateChange$.subscribe((change) => {
        const expectedChange = {
          action: 'setState',
          propChanges: {
            firstName: { prevValue: undefined, nextValue: newState.firstName },
            lastName: { prevValue: undefined, nextValue: newState.lastName },
          },
        } as TestStateChange;
        expect(change).toEqual(expectedChange);
        expect(store.stateChange).toEqual(expectedChange);
      });

      store.setState('setState', newState);
      expect(store.state.firstName).toBe(newState.firstName);
      expect(store.state.lastName).toBe(newState.lastName);
    })
  );

  it(
    'should emit new change after subscribe',
    waitForAsync(() => {
      let called = 0;
      store.stateChange$.subscribe((change) => {
        called++;
        const expectedChange = {
          action: 'patchPartialState',
          propChanges: {
            lastName: {
              prevValue: initialState.lastName,
              nextValue: newState.lastName,
            },
          },
        } as TestStateChange;
        expect(change).toEqual(expectedChange);
        expect(store.stateChange).toEqual(expectedChange);
      });

      patchPartialState();
      expect(called).toBe(1);
    })
  );

  it(
    'should not emit last change on subscribe',
    waitForAsync(() => {
      let called = 0;
      patchPartialState();
      store.stateChange$.subscribe((change) => {
        called++;
      });
      expect(called).toBe(0);
    })
  );

  it('should notify state subscriber on patch whole state', () => {
    let called = 0;

    store.state$.subscribe((state) => {
      if (called === 0) {
        expect(state).toEqual(initialState);
      } else {
        expect(state).toEqual(newState);
      }
      called++;
    });
    expect(called).toBe(1);

    patchWholeState();
    expect(called).toBe(2);
  });

  it('should notify state subscriber on patch partial state', () => {
    let called = 0;

    store.state$.subscribe((state) => {
      if (called === 0) {
        expect(state).toEqual(initialState);
      } else {
        expect(state).toEqual(newState);
      }
      called++;
    });
    expect(called).toBe(1);

    patchPartialState();
    expect(called).toBe(2);
  });

  it(
    'should not notify state subscriber after unsubscribe',
    waitForAsync(() => {
      let called = 0;

      const subscription = store.state$.subscribe(() => {
        called++;
      });
      expect(called).toBe(1);

      subscription.unsubscribe();
      patchWholeState();
      patchPartialState();
      expect(called).toBe(1);
    })
  );

  it('should not log action by default', () => {
    const logSpy = spyOn(console, 'log');
    patchWholeState();
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should not log action when disabled', () => {
    spyOnProperty(store, 'config').and.returnValue({ log: false });
    const logSpy = spyOn(console, 'log');
    patchWholeState();
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should log action on patch whole state', () => {
    spyOnProperty(store, 'config').and.returnValue({ log: true });
    const logSpy = spyOn(console, 'log');

    patchWholeState();

    expect(logSpy).toHaveBeenCalledWith({
      action: 'patchWholeState',
      patch: newState,
      nextState: newState,
      prevState: initialState,
      propChanges: {
        lastName: {
          prevValue: initialState.lastName,
          nextValue: newState.lastName,
        },
      },
    });
  });

  it('should log action on patch partial state', () => {
    spyOnProperty(store, 'config').and.returnValue({ log: true });
    const logSpy = spyOn(console, 'log');

    patchPartialState();

    expect(logSpy).toHaveBeenCalledWith({
      action: 'patchPartialState',
      patch: { lastName: newState.lastName },
      nextState: newState,
      prevState: initialState,
      propChanges: {
        lastName: {
          prevValue: initialState.lastName,
          nextValue: newState.lastName,
        },
      },
    });
  });

  it('should log action on set state', () => {
    spyOnProperty(store, 'config').and.returnValue({ log: true });
    const logSpy = spyOn(console, 'log').and.callThrough();

    store.setState('setState', {});

    expect(logSpy).toHaveBeenCalledWith({
      action: 'setState',
      patch: {},
      nextState: {},
      prevState: initialState,
      propChanges: {
        firstName: { prevValue: initialState.firstName, nextValue: undefined },
        lastName: { prevValue: initialState.lastName, nextValue: undefined },
      },
    });
  });

  it(
    'should update state before emitting change',
    waitForAsync(() => {
      store.stateChange$.subscribe((change) => {
        expect(store.state).toEqual(newState);
      });
      patchPartialState();
    })
  );

  // TODO: Test asyncAction.
});

export enum TestActionEnum {
  patchWholeState = 'patchWholeState',
  patchPartialState = 'patchPartialState',
  setState = 'setState',
  null = 'null',
}

export interface TestStateChangeEnummed
  extends ObservableStateChange<TestState, TestActionEnum> {}

@Injectable()
export class TestStoreEnummed extends ObservableStore<
  TestState,
  TestActionEnum
> {
  constructor() {
    super(initialState);
  }
}

describe('ObservableStoreEnummed', () => {
  let store: TestStoreEnummed;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TestStoreEnummed] });
    store = TestBed.inject(TestStoreEnummed);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it(
    'should be able to use enum action',
    waitForAsync(() => {
      store.stateChange$.subscribe((change) => {
        const expectedChange = {
          action: TestActionEnum.patchPartialState,
          propChanges: {
            lastName: {
              prevValue: initialState.lastName,
              nextValue: newState.lastName,
            },
          },
        } as TestStateChangeEnummed;

        store.patchState(TestActionEnum.patchPartialState, {
          lastName: newState.lastName,
        });
        expect(change).toEqual(expectedChange);
        expect(store.stateChange).toEqual(expectedChange);
      });
    })
  );

  // TODO: Test asyncAction.
});
