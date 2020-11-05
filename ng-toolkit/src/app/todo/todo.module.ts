import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import {
  TodoCreateComponent,
  TodoDetailComponent,
  TodoListComponent,
} from './components';
import { TodoService, TodoServiceImpl } from './services';
import { SharedModule } from '../shared/shared.module';

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
