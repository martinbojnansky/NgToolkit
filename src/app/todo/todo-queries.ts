import { Injectable } from '@angular/core';
import { AppQueries } from '../app-queries';
import { TodoAction, TodoState, TodoStore } from './todo-store';

@Injectable()
export class TodoQueries extends AppQueries<TodoState, TodoAction> {
  constructor(protected store: TodoStore) {
    super(store);
  }
}
