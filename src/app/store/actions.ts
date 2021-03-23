import { Type } from '@angular/core';
import { SayHiReducer } from './reducers';

export interface AppAction<TAction extends string, TPayload, TReducer> {
  name: TAction;
  payload: TPayload;
  reducerType: Type<TReducer>;
}

export interface AppActionDef<TAction extends string, TPayload, TReducer> {
  actionType: AppAction<TAction, TPayload, TReducer>;
  payloadType: TPayload;
  reducerType: Type<TReducer>;
  create: (payload: TPayload) => AppAction<TAction, TPayload, TReducer>;
}

// export interface AppAsyncAction<TPayload> {
//   name: string;
//   payload: TPayload;
//   reducer: Type<Reducer>;
// }

const createAction = <TAction extends string, TPayload, TReducer>(
  name: TAction,
  payloadType: Type<TPayload>,
  reducerType: Type<TReducer>
): AppActionDef<TAction, TPayload, TReducer> => ({
  actionType: <AppAction<TAction, TPayload, TReducer>>null,
  payloadType: <TPayload>null,
  reducerType: reducerType,
  create: (payload: TPayload): AppAction<TAction, TPayload, TReducer> => ({
    name: name,
    payload: payload,
    reducerType: reducerType,
  }),
});

// const createAsyncAction = <TName extends string, TPayload, TEffects, TReducer>(
//   name: TName,
//   payloadType: Type<TPayload>,
//   effectsType: Type<TEffects>,
//   reducer: Type<TReducer>
// ) => ({
//   name: name,
//   payloadType: <TPayload>null,
//   effects: <TEffects>null,
//   reducer: reducer,
//   create: (payload: TPayload) => ({
//     name: name,
//     payload: payload,
//     reducer: reducer,
//   }),
// });

export const actions = {
  sayHi: createAction(
    'sayHi',
    class {
      name: string;
    },
    SayHiReducer
  ),

  // sayHiAsync: createAsyncAction(
  //   'sayHiAsync',
  //   class {
  //     name: string;
  //   },
  //   class {
  //     started: 'started';
  //     completed: 'completed';
  //   },
  //   SayHiAsyncReducer
  // ),
};
