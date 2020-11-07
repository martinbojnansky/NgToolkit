import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoService, TodoServiceImpl } from './services/todo/todo.service';

@NgModule({
  declarations: [TodoListComponent, TodoDetailComponent, TodoCreateComponent],
  imports: [CommonModule, TodoRoutingModule, SharedModule],
  providers: [
    {
      provide: TodoService,
      useClass: TodoServiceImpl,
    },
  ],
})
export class TodoModule {}
