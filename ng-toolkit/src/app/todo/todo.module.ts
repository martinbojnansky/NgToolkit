import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppStore } from '../app-store';
import { SharedModule } from '../shared/shared.module';
import { TodosComponent } from './components/todos/todos.component';
import { TodoService, TodoServiceImpl } from './services/todo/todo.service';
import { TodoQueries } from './todo-queries';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoStore } from './todo-store';

@NgModule({
  declarations: [TodosComponent],
  imports: [CommonModule, TodoRoutingModule, SharedModule],
  providers: [
    {
      provide: TodoStore,
      useExisting: AppStore,
    },
    TodoQueries,
    {
      provide: TodoService,
      useClass: TodoServiceImpl,
    },
  ],
})
export class TodoModule {}
