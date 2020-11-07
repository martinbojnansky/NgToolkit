import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { TodoDetail, TodoSummary } from '../../models';
import { TodoStore } from '../../todo-store';

export abstract class TodoService {
  abstract createItem(title: string): Observable<void>;
  abstract readItems(): Observable<void>;
  abstract readItem(id: string): Observable<void>;
  abstract updateItem(item: TodoDetail): Observable<void>;
  abstract deleteItem(id: string): Observable<void>;
}

@Injectable()
export class TodoServiceImpl {
  constructor(
    protected todoStore: TodoStore,
    protected apiService: ApiService
  ) {}

  createItem(title: string) {
    return this.todoStore.patchStateAsync(
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
            ...this.todoStore.state.todos,
            isBusy: true,
            error: null,
          },
        }),
        completed: (v) => ({
          todos: {
            ...this.todoStore.state.todos,
            isBusy: false,
            error: null,
            items: [
              <TodoSummary>{
                id: v.id,
                title: v.title,
                completed: false,
              },
              ...(this.todoStore.state.todos?.items || []),
            ],
          },
        }),
        failed: (e) => ({
          todos: {
            ...this.todoStore.state.todos,
            isBusy: false,
            error: e,
          },
        }),
      }
    );
  }

  readItems() {
    return this.todoStore.patchStateAsync(
      'readTodosStarted',
      this.apiService.getItems<TodoSummary>('todo'),
      {
        started: () => ({
          todos: {
            ...this.todoStore.state.todos,
            isBusy: true,
            error: null,
          },
        }),
        completed: (v) => ({
          todos: {
            ...this.todoStore.state.todos,
            isBusy: false,
            error: null,
            items: v,
          },
        }),
        failed: (e) => ({
          todos: {
            ...this.todoStore.state.todos,
            isBusy: false,
            error: e,
          },
        }),
      }
    );
  }

  readItem(id: string) {
    return this.todoStore.patchStateAsync(
      'readTodoStarted',
      this.apiService.getItem<TodoDetail>('todo', id),
      {
        started: () => ({
          todo: {
            ...this.todoStore.state.todo,
            isBusy: true,
            item: null,
          },
        }),
        completed: (v) => ({
          todo: {
            ...this.todoStore.state.todo,
            isBusy: false,
            error: null,
            item: v,
          },
        }),
        failed: (e) => ({
          todo: {
            ...this.todoStore.state.todo,
            isBusy: false,
            error: e,
          },
        }),
        cancelled: () => ({
          todo: {
            ...this.todoStore.state.todo,
            isBusy: false,
            error: null,
          },
        }),
      }
    );
  }

  updateItem(item: TodoDetail) {
    return this.todoStore.patchStateAsync(
      'updateTodoStarted',
      this.apiService.setItem('todo', item),
      {
        started: () => ({
          todo: {
            ...this.todoStore.state.todo,
            isBusy: true,
          },
        }),
        completed: (v) => ({
          todo: {
            ...this.todoStore.state.todo,
            isBusy: false,
            error: null,
            item: v,
          },
        }),
        failed: (e) => ({
          todo: {
            ...this.todoStore.state.todo,
            isBusy: false,
            error: e,
          },
        }),
        cancelled: () => ({
          todo: {
            ...this.todoStore.state.todo,
            isBusy: false,
            error: null,
          },
        }),
      }
    );
  }

  deleteItem(id: string) {
    return this.todoStore.patchStateAsync(
      'deleteTodoStarted',
      this.apiService.deleteItem('todo', id),
      {
        started: () => ({
          todo: {
            ...this.todoStore.state.todo,
            isBusy: true,
            item: null,
          },
        }),
        completed: (v) => ({
          todo: {
            ...this.todoStore.state.todo,
            isBusy: false,
            error: null,
            item: null,
          },
        }),
        failed: (e) => ({
          todo: {
            ...this.todoStore.state.todo,
            isBusy: false,
            error: e,
          },
        }),
      }
    );
  }
}
