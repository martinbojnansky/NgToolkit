import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppStore } from '../app-store';
import { TodosComponent } from './components/todos/todos.component';
import { TodoService, TodoServiceImpl } from './services/todo.service';
import { TodoQueries } from './todo-queries';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoStore } from './todo-store';

@NgModule({
  declarations: [TodosComponent],
  imports: [CommonModule, TodoRoutingModule],
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
