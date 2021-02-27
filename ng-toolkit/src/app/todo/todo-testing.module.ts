import { NgModule } from '@angular/core';
import { AppTestingModule } from '../app-testing.module';
import { TodoModule } from './todo.module';

@NgModule({
  imports: [AppTestingModule, TodoModule],
})
export class TodoTestingModule {}
