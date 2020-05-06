import { Injectable } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ObservableStateChange, ObservableStore } from './observable-store';

export interface TestState {
  firstName: string;
  lastName: string;
}

export enum TestAction {
  patchWholeState = 'patchWholeState',
  patchPartialState = 'patchPartialState',
  setState = 'setState',
  null = 'null',
}

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
    store.patchState(TestAction.patchWholeState, {
      ...store.state,
      lastName: newState.lastName,
    });
  }

  function patchPartialState(): void {
    store.patchState(TestAction.patchPartialState, {
      lastName: newState.lastName,
    });
  }

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should return initial state', () => {
    expect(store.state).toBe(initialState);
  });

  it('should patch whole state', async(() => {
    store.stateChange$.subscribe((change) => {
      const expectedChange = {
        action: TestAction.patchWholeState,
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
  }));

  it('should patch partial state', async(() => {
    store.stateChange$.subscribe((change) => {
      const expectedChange = {
        action: TestAction.patchPartialState,
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
  }));

  it('should emmit only change when patch is null', async(() => {
    let actionCalled = 0;
    let stateCalled = -1; // State is of type BehaviorSubject which will be called at least once on subscribe.

    store.stateChange$.subscribe((change) => {
      actionCalled++;
      const expectedChange = {
        action: TestAction.null,
        propChanges: {},
      } as TestStateChange;
      expect(change).toEqual(expectedChange);
      expect(store.stateChange).toEqual(expectedChange);
    });
    store.state$.subscribe((state: TestState) => {
      stateCalled++;
      expect(store.state).toBe(state);
    });

    store.patchState(TestAction.null, null);

    expect(actionCalled).toBe(1);
    expect(stateCalled).toBe(0);
  }));

  it('should set empty state', async(() => {
    store.stateChange$.subscribe((change) => {
      const expectedChange = {
        action: TestAction.setState,
        propChanges: {
          firstName: {
            prevValue: initialState.firstName,
            nextValue: undefined,
          },
          lastName: { prevValue: initialState.lastName, nextValue: undefined },
        },
      } as TestStateChange;
      expect(change).toEqual(expectedChange);
      expect(store.stateChange).toEqual(expectedChange);
    });

    expect(store.state).toBe(initialState);
    store.setState(TestAction.setState, {});
    expect(store.state.firstName).toBeUndefined();
    expect(store.state.lastName).toBeUndefined();
  }));

  it('should set partial state', async(() => {
    store.stateChange$.subscribe((change) => {
      const expectedChange = {
        action: TestAction.setState,
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
    store.setState(TestAction.setState, { lastName: newState.lastName });
    expect(store.state.firstName).toBeUndefined();
    expect(store.state.lastName).toBe(newState.lastName);
  }));

  it('should set partial state', async(() => {
    store.setState(TestAction.setState, {});
    expect(store.state).toEqual({} as any);

    store.stateChange$.subscribe((change) => {
      const expectedChange = {
        action: TestAction.setState,
        propChanges: {
          firstName: { prevValue: undefined, nextValue: newState.firstName },
          lastName: { prevValue: undefined, nextValue: newState.lastName },
        },
      } as TestStateChange;
      expect(change).toEqual(expectedChange);
      expect(store.stateChange).toEqual(expectedChange);
    });

    store.setState(TestAction.setState, newState);
    expect(store.state.firstName).toBe(newState.firstName);
    expect(store.state.lastName).toBe(newState.lastName);
  }));

  it('should emit new change after subscribe', async(() => {
    let called = 0;
    store.stateChange$.subscribe((change) => {
      called++;
      const expectedChange = {
        action: TestAction.patchPartialState,
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
  }));

  it('should not emit last change on subscribe', async(() => {
    let called = 0;
    patchPartialState();
    store.stateChange$.subscribe((change) => {
      called++;
    });
    expect(called).toBe(0);
  }));

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

  it('should not notify state subscriber after unsubscribe', async(() => {
    let called = 0;

    const subscription = store.state$.subscribe(() => {
      called++;
    });
    expect(called).toBe(1);

    subscription.unsubscribe();
    patchWholeState();
    patchPartialState();
    expect(called).toBe(1);
  }));

  xit('should log action on patch whole state', () => {
    const logSpy = spyOn(console, 'log');

    patchWholeState();

    expect(logSpy).toHaveBeenCalledWith({
      action: `patchWholeState`,
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

  xit('should log action on patch partial state', () => {
    const logSpy = spyOn(console, 'log');

    patchPartialState();

    expect(logSpy).toHaveBeenCalledWith({
      action: `patchPartialState`,
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

  xit('should log action on set state', () => {
    const logSpy = spyOn(console, 'log').and.callThrough();

    store.setState(TestAction.setState, {});

    expect(logSpy).toHaveBeenCalledWith({
      action: `setState`,
      patch: {},
      nextState: {},
      prevState: initialState,
      propChanges: {
        firstName: { prevValue: initialState.firstName, nextValue: undefined },
        lastName: { prevValue: initialState.lastName, nextValue: undefined },
      },
    });
  });

  it('should update state before emitting change', async(() => {
    store.stateChange$.subscribe((change) => {
      expect(store.state).toEqual(newState);
    });
    patchPartialState();
  }));
});
