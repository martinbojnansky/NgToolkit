import { Injectable } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { ObservableStore, ObservableStoreChange } from './observable-store';

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
  extends ObservableStoreChange<TestState, TestAction> {}

@Injectable()
export class TestStore extends ObservableStore<TestState, TestAction> {
  constructor() {
    super(initialState);
  }
}

fdescribe('ObservableStore', () => {
  let store: TestStore;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TestStore] });
    store = TestBed.inject(TestStore);
  });

  function patchWholeState(): void {
    store.patchState('patchWholeState', {
      ...store.snapshot.state,
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
    expect(store.snapshot.state).toBe(initialState);
  });

  it(
    'should patch whole state',
    waitForAsync(() => {
      store.changes$.pipe(skip(1)).subscribe((change) => {
        const expectedChange = {
          action: 'patchWholeState',
          state: newState,
          propChanges: {
            lastName: {
              prevValue: initialState.lastName,
              nextValue: newState.lastName,
            },
          },
        } as TestStateChange;
        expect(change).toEqual(expectedChange);
      });

      patchWholeState();
      expect(store.snapshot.state).not.toBe(newState);
    })
  );

  it(
    'should patch partial state',
    waitForAsync(() => {
      store.changes$.pipe(skip(1)).subscribe((change) => {
        const expectedChange = {
          action: 'patchPartialState',
          state: newState,
          propChanges: {
            lastName: {
              prevValue: initialState.lastName,
              nextValue: newState.lastName,
            },
          },
        } as TestStateChange;
        expect(change).toEqual(expectedChange);
      });

      patchPartialState();
      expect(store.snapshot.state).not.toBe(newState);
    })
  );

  it(
    'should set empty state',
    waitForAsync(() => {
      store.changes$.pipe(skip(1)).subscribe((change) => {
        const expectedChange = {
          action: 'setState',
          state: {},
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
      });

      expect(store.snapshot.state).toBe(initialState);
      store.setState('setState', {});
      expect(store.snapshot.state.firstName).toBeUndefined();
      expect(store.snapshot.state.lastName).toBeUndefined();
    })
  );

  it(
    'should set partial state',
    waitForAsync(() => {
      store.changes$.pipe(skip(1)).subscribe((change) => {
        const expectedChange = {
          action: 'setState',
          state: { lastName: newState.lastName },
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
      });

      expect(store.snapshot.state).toBe(initialState);
      store.setState('setState', { lastName: newState.lastName });
      expect(store.snapshot.state.firstName).toBeUndefined();
      expect(store.snapshot.state.lastName).toBe(newState.lastName);
    })
  );

  it(
    'should set partial state',
    waitForAsync(() => {
      store.setState('setState', {});
      expect(store.snapshot.state).toEqual({} as any);

      store.changes$.pipe(skip(1)).subscribe((change) => {
        const expectedChange = {
          action: 'setState',
          state: newState,
          propChanges: {
            firstName: { prevValue: undefined, nextValue: newState.firstName },
            lastName: { prevValue: undefined, nextValue: newState.lastName },
          },
        } as TestStateChange;
        expect(change).toEqual(expectedChange);
      });

      store.setState('setState', newState);
      expect(store.snapshot.state.firstName).toBe(newState.firstName);
      expect(store.snapshot.state.lastName).toBe(newState.lastName);
    })
  );

  it('should notify subscriber on patch whole state', () => {
    let called = 0;

    store.changes$.subscribe((change) => {
      if (called === 0) {
        expect(change.state).toEqual(initialState);
      } else {
        expect(change.state).toEqual(newState);
      }
      called++;
    });
    expect(called).toBe(1);

    patchWholeState();
    expect(called).toBe(2);
  });

  it('should notify subscriber on patch partial state', () => {
    let called = 0;

    store.changes$.subscribe((change) => {
      if (called === 0) {
        expect(change.state).toEqual(initialState);
      } else {
        expect(change.state).toEqual(newState);
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

      const subscription = store.changes$.subscribe(() => {
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
      state: newState,
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
      state: newState,
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
      state: {},
      prevState: initialState,
      propChanges: {
        firstName: { prevValue: initialState.firstName, nextValue: undefined },
        lastName: { prevValue: initialState.lastName, nextValue: undefined },
      },
    });
  });

  // TODO: Test asyncAction.
});

export enum TestActionEnum {
  patchWholeState = 'patchWholeState',
  patchPartialState = 'patchPartialState',
  setState = 'setState',
  null = 'null',
}

export interface TestStateChangeEnummed
  extends ObservableStoreChange<TestState, TestActionEnum> {}

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
      store.changes$.subscribe((change) => {
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
      });
    })
  );

  // TODO: Test asyncAction.
});
