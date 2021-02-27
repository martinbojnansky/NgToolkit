import { Injectable } from '@angular/core';
import { nameof } from 'projects/ng-toolkit-lib/src/public-api';
import { Observable } from 'rxjs';
import { DatasetQuery } from 'src/app/core/models';
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
export class TodoServiceImpl extends TodoService {
  constructor(
    protected todoStore: TodoStore,
    protected apiService: ApiService
  ) {
    super();
  }

  createItem(title: string) {
    return this.todoStore.patchStateAsync(
      'createTodoStarted',
      this.apiService.setItem<TodoDetail>('todo', {
        id: this.apiService.getUuid(),
        title,
        description: null,
        createdAt: new Date(),
        completed: false,
      }),
      {
        completed: (v) => ({
          todos: {
            ...this.todoStore.snapshot.props.todos,
            items: [
              {
                id: v.id,
                title: v.title,
                completed: false,
              },
              ...(this.todoStore.snapshot.props.todos?.items || []),
            ],
          },
        }),
      }
    );
  }

  readItems() {
    const query: DatasetQuery = {
      sorts: [
        { prop: nameof<TodoDetail>('createdAt'), order: 'desc' },
        { prop: nameof<TodoDetail>('completed'), order: 'asc' },
      ],
    };

    return this.todoStore.patchStateAsync(
      'readTodosStarted',
      this.apiService.getItems<TodoSummary>('todo', query),
      {
        started: () => ({
          todos: {
            ...this.todoStore.snapshot.props.todos,
            isBusy: true,
            error: null,
          },
        }),
        completed: (v) => ({
          todos: {
            ...this.todoStore.snapshot.props.todos,
            isBusy: false,
            error: null,
            items: v,
          },
        }),
        failed: (e) => ({
          todos: {
            ...this.todoStore.snapshot.props.todos,
            isBusy: false,
            error: { ...e, message: `Todos could not be loaded. ${e.message}` },
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
            ...this.todoStore.snapshot.props.todo,
            isBusy: true,
            item: this.todoStore.snapshot.props.todos?.items?.find(
              (t) => t.id === id
            ) as TodoDetail,
          },
        }),
        completed: (v) => ({
          todo: {
            ...this.todoStore.snapshot.props.todo,
            isBusy: false,
            error: null,
            item: v,
          },
        }),
        failed: (e) => ({
          todo: {
            ...this.todoStore.snapshot.props.todo,
            isBusy: false,
            error: { ...e, message: `Todo could not be loaded. ${e.message}` },
          },
        }),
        cancelled: () => ({
          todo: {
            ...this.todoStore.snapshot.props.todo,
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
            ...this.todoStore.snapshot.props.todo,
            isBusy: true,
          },
        }),
        completed: (v) => ({
          todo: {
            ...this.todoStore.snapshot.props.todo,
            isBusy: false,
            error: null,
            item: v,
          },
        }),
        failed: (e) => ({
          todo: {
            ...this.todoStore.snapshot.props.todo,
            isBusy: false,
            error: { ...e, message: `Todo could not be saved. ${e.message}` },
          },
        }),
        cancelled: () => ({
          todo: {
            ...this.todoStore.snapshot.props.todo,
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
            ...this.todoStore.snapshot.props.todo,
            isBusy: true,
          },
        }),
        completed: (v) => ({
          todo: {
            ...this.todoStore.snapshot.props.todo,
            isBusy: false,
            error: null,
            item: null,
          },
          todos: {
            ...this.todoStore.snapshot.props.todos,
            items:
              this.todoStore.snapshot.props.todos?.items?.filter(
                (t) => t.id !== id
              ) || [],
          },
        }),
        failed: (e) => ({
          todo: {
            ...this.todoStore.snapshot.props.todo,
            isBusy: false,
            error: { ...e, message: `Todo could not be deleted. ${e.message}` },
          },
        }),
      }
    );
  }
}
