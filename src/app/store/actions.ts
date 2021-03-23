import { Type } from '@angular/core';
import { Reducer, SayHiAsyncReducer, SayHiReducer } from './reducers';

export interface AppAction<TPayload> {
  name: string;
  payload: TPayload;
  reducer: Type<Reducer>;
}

export interface AppAsyncAction<TPayload> {
  name: string;
  payload: TPayload;
  reducer: Type<Reducer>;
}

const createAction = <TAction extends string, TPayload>(
  name: TAction,
  reducer: Type<Reducer>
) => ({
  create: (payload: TPayload) => ({
    name: name,
    payload: payload,
  }),
  name: name,
  payloadType: <TPayload>null,
  reducer: reducer,
});

const createAsyncAction = <
  TName extends string,
  TPayload,
  TReducer,
  TEffects extends string
>(
  name: TName,
  reducer: Type<TReducer>
) => ({
  create: (payload: TPayload) => ({
    name: name,
    payload: payload,
  }),
  name: name,
  payloadType: <TPayload>null,
  effectsType: <TEffects>null,
  reducer: reducer,
});

export const actions = {
  sayHi: createAction<'sayHi', { name: string }>('sayHi', SayHiReducer),
  sayHiAsync: createAsyncAction<
    'sayHiAsync',
    { name: string },
    SayHiAsyncReducer,
    'started' | 'completed'
  >('sayHiAsync', SayHiAsyncReducer),
};
