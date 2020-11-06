import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { db, uuid } from 'src/app/helpers';
import { Store } from 'src/app/store';
import { TodoDetail, TodoSummary } from '../../models';

export abstract class TodoService {
  abstract createItem(title: string): Observable<void>;
  abstract readItems(): Observable<void>;
  abstract readItem(id: string): Observable<void>;
  abstract updateItem(item: TodoDetail): Observable<void>;
  abstract deleteItem(id: string): Observable<void>;
}

@Injectable()
export class TodoServiceImpl {
  constructor(protected store: Store) {}

  createItem(title: string) {
    return this.store.patchStateAsync(
      'createTodoStarted',
      db.setItem('todo', <TodoDetail>{
        id: uuid(),
        title: title,
        description: null,
        createdAt: new Date(),
        completed: false,
      }),
      {
        started: () => ({
          todos: {
            ...this.store.state.todos,
            isBusy: true,
            error: null,
          },
        }),
        completed: (v) => ({
          todos: {
            ...this.store.state.todos,
            isBusy: false,
            error: null,
            items: [
              <TodoSummary>{
                id: v.id,
                title: v.title,
                completed: false,
              },
              ...(this.store.state.todos?.items || []),
            ],
          },
        }),
        failed: (e) => ({
          todos: {
            ...this.store.state.todos,
            isBusy: false,
            error: e,
          },
        }),
      }
    );
  }

  readItems() {
    return this.store.patchStateAsync(
      'readTodosStarted',
      db.getItems<TodoSummary>('todo'),
      {
        started: () => ({
          todos: {
            ...this.store.state.todos,
            isBusy: true,
            error: null,
          },
        }),
        completed: (v) => ({
          todos: {
            ...this.store.state.todos,
            isBusy: false,
            error: null,
            items: v,
          },
        }),
        failed: (e) => ({
          todos: {
            ...this.store.state.todos,
            isBusy: false,
            error: e,
          },
        }),
      }
    );
  }

  readItem(id: string) {
    return this.store.patchStateAsync(
      'readTodoStarted',
      db.getItem<TodoDetail>('todo', id),
      {
        started: () => ({
          todo: {
            ...this.store.state.todo,
            isBusy: true,
            item: null,
          },
        }),
        completed: (v) => ({
          todo: {
            ...this.store.state.todo,
            isBusy: false,
            error: null,
            item: v,
          },
        }),
        failed: (e) => ({
          todo: {
            ...this.store.state.todo,
            isBusy: false,
            error: e,
          },
        }),
        cancelled: () => ({
          todo: {
            ...this.store.state.todo,
            isBusy: false,
            error: null,
          },
        }),
      }
    );
  }

  updateItem(item: TodoDetail) {
    return this.store.patchStateAsync(
      'updateTodoStarted',
      db.setItem('todo', item),
      {
        started: () => ({
          todo: {
            ...this.store.state.todo,
            isBusy: true,
          },
        }),
        completed: (v) => ({
          todo: {
            ...this.store.state.todo,
            isBusy: false,
            error: null,
            item: v,
          },
        }),
        failed: (e) => ({
          todo: {
            ...this.store.state.todo,
            isBusy: false,
            error: e,
          },
        }),
        cancelled: () => ({
          todo: {
            ...this.store.state.todo,
            isBusy: false,
            error: null,
          },
        }),
      }
    );
  }

  deleteItem(id: string) {
    return this.store.patchStateAsync(
      'deleteTodoStarted',
      db.deleteItem('todo', id),
      {
        started: () => ({
          todo: {
            ...this.store.state.todo,
            isBusy: true,
            item: null,
          },
        }),
        completed: (v) => ({
          todo: {
            ...this.store.state.todo,
            isBusy: false,
            error: null,
            item: null,
          },
        }),
        failed: (e) => ({
          todo: {
            ...this.store.state.todo,
            isBusy: false,
            error: e,
          },
        }),
      }
    );
  }
}
