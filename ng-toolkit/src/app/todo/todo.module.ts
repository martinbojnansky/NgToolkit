import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService, TodoServiceImpl } from './services/todo/todo.service';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoStore } from './todo-store';

@NgModule({
  declarations: [TodoListComponent, TodoDetailComponent, TodoCreateComponent],
  imports: [CommonModule, TodoRoutingModule, SharedModule],
  providers: [
    TodoStore,
    {
      provide: TodoService,
      useClass: TodoServiceImpl,
    },
  ],
})
export class TodoModule {}
