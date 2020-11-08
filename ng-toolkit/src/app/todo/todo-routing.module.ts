import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDraftGuard, nameof } from 'ng-toolkit-lib';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetail } from './models';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    children: [
      {
        path: `:${nameof<TodoDetail>('id')}`,
        component: TodoDetailComponent,
        canDeactivate: [FormDraftGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
