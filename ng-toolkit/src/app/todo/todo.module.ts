import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './components';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoService, TodoServiceImpl } from './services';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TodoListComponent, TodoDetailComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: TodoService,
      useClass: TodoServiceImpl
    }
  ]
})
export class TodoModule { }
