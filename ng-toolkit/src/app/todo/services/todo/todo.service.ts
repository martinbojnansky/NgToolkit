import { Injectable } from '@angular/core';
import { effect } from 'ng-toolkit-lib';
import { Observable } from 'rxjs';
import { db, uuid } from 'src/app/helpers';
import { Action, Store } from 'src/app/store';
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
  constructor(protected store: Store) { }

  createItem(title: string) {
    this.store.patchState(Action.createTodoStarted, {
      todos: {
        ...this.store.state.todos,
        isBusy: true,
        error: null
      }
    });
    
    return db.setItem('todo', <TodoDetail>{
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

  readItems() {
    this.store.patchState(Action.readTodosStarted, {
      todos: {
        ...this.store.state.todos,
        isBusy: true,
        error: null
      }
    });
    
    return db.getItems<TodoSummary>('todo').pipe(effect(
      data => this.store.patchState(Action.readTodosCompleted, {
        todos: {
          ...this.store.state.todos,
          isBusy: false,
          error: null,
          items: data
        }
      }),
      error => this.store.patchState(Action.readTodosFailed, {
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
    
    return db.getItem<TodoDetail>('todo', id).pipe(effect(
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

  updateItem(item: TodoDetail) {
    this.store.patchState(Action.updateTodoStarted, {
      todo: {
        ...this.store.state.todo,
        isBusy: true
      }
    });
    
    return db.setItem('todo', item).pipe(effect(
      data => this.store.patchState(Action.updateTodoCompleted, {
        todo: {
          ...this.store.state.todo,
          isBusy: false,
          error: null,
          item: data
        }
      }),
      error => this.store.patchState(Action.updateTodoFailed, {
        todo: {
          ...this.store.state.todo,
          isBusy: false,
          error: error
        }
      })
    ));
  }

  deleteItem(id: string) {
    this.store.patchState(Action.deleteTodoStarted, {
      todo: {
        ...this.store.state.todo,
        isBusy: true,
        item: null
      }
    });
    
    return db.deleteItem('todo', id).pipe(effect(
      () => this.store.patchState(Action.deleteTodoCompleted, {
        todo: {
          ...this.store.state.todo,
          isBusy: false,
          error: null,
          item: null
        }
      }),
      error => this.store.patchState(Action.deleteTodoFailed, {
        todo: {
          ...this.store.state.todo,
          isBusy: false,
          error: error
        }
      })
    ));
  }
}
