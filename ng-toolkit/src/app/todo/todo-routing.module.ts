import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { nameof } from 'ng-toolkit-lib';
import { TodoDetailComponent, TodoListComponent } from './components';
import { TodoDetail } from './models';

const routes: Routes = [
  { path: '', component: TodoListComponent, children: [
    { path: `:${nameof<TodoDetail>('id')}`, component: TodoDetailComponent }
  ] }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
