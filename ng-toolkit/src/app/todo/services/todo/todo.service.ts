import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
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
  constructor(protected store: Store, protected apiService: ApiService) {}

  createItem(title: string) {
    return this.store.patchStateAsync(
      'createTodoStarted',
      this.apiService.setItem('todo', <TodoDetail>{
        id: this.apiService.getUuid(),
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
      this.apiService.getItems<TodoSummary>('todo'),
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
      this.apiService.getItem<TodoDetail>('todo', id),
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
      this.apiService.setItem('todo', item),
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
      this.apiService.deleteItem('todo', id),
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
