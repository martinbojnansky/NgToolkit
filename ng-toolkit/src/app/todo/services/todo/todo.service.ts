import { Injectable } from '@angular/core';
import { effect } from 'ng-toolkit-lib';
import { Observable } from 'rxjs';
import { db, uuid } from 'src/app/helpers';
import { Action, Store } from 'src/app/store';
import { TodoDetail, TodoSummary } from '../../models';

export abstract class TodoService {
  abstract createItem(title: string): Observable<void>;
  abstract readItem(id: string): Observable<void>;
}

@Injectable()
export class TodoServiceImpl {
  constructor(protected store: Store) { }

  createItem(title: string) {
    this.store.patchState(Action.createTodoStarted, {
      todos: {
        ...this.store.state.todos,
        isBusy: true,
        error: null
      }
    });
    
    return db.setItem(<TodoDetail>{
      id: uuid(),
      title: title,
      description: null,
      createdAt: new Date(),
      completed: false,
    }).pipe(effect(
      data => this.store.patchState(Action.createTodoCompleted, {
        todos: {
          ...this.store.state.todos,
          isBusy: false,
          error: null,
          items: [<TodoSummary>{
            id: data.id,
            title: data.title,
            completed: false
          }, ...this.store.state.todos?.items || []]
        }
      }),
      error => this.store.patchState(Action.createTodoFailed, {
        todos: {
          ...this.store.state.todos,
          isBusy: false,
          error: error
        }
      })
    ));
  }

  readItem(id: string) {
    this.store.patchState(Action.readTodoStarted, {
      todo: {
        ...this.store.state.todo,
        isBusy: true,
        item: null
      }
    });
    
    return db.getItem<TodoDetail>(id).pipe(effect(
      data => this.store.patchState(Action.readTodoCompleted, {
        todo: {
          ...this.store.state.todo,
          isBusy: false,
          error: null,
          item: data
        }
      }),
      error => this.store.patchState(Action.readTodoFailed, {
        todo: {
          ...this.store.state.todo,
          isBusy: false,
          error: error
        }
      })
    ));
  }
}
