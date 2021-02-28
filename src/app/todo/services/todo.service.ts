import { Injectable } from '@angular/core';
import { uuid } from 'ng-toolkit-lib';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TodoSummary } from '../todo-models';
import { TodoStore } from '../todo-store';

export abstract class TodoService {
  abstract readItems(): Observable<void>;
}

@Injectable()
export class TodoServiceImpl extends TodoService {
  constructor(protected todoStore: TodoStore) {
    super();
  }

  readItems() {
    return this.todoStore.patchStateAsync(getFakeTodos(), {
      started: () => [
        'readTodosStarted',
        {
          todos: {
            ...this.todoStore.snapshot.state.todos,
            busy: true,
            error: null,
          },
        },
      ],
      completed: (v) => [
        'readTodosCompleted',
        {
          todos: {
            ...this.todoStore.snapshot.state.todos,
            busy: false,
            error: null,
            items: v,
          },
        },
      ],
      failed: (e) => [
        'readTodosFailed',
        {
          todos: {
            ...this.todoStore.snapshot.state.todos,
            busy: false,
            error: {
              ...e,
              message: `Todos could not be loaded. ${e.message}`,
            },
          },
        },
      ],
      cancelled: () => ['readTodosCancelled', null],
    });
  }
}

const getFakeTodos = () => {
  return of([
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
    { id: uuid(), title: `Name ${uuid()}` },
  ] as TodoSummary[]).pipe(delay(1500));
};
