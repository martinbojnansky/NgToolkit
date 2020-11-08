import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ApiService,
  ApiServiceFakeImpl,
} from 'src/app/core/services/api.service';
import { TodoService, TodoServiceImpl } from '../../services/todo/todo.service';
import { TodoStore } from '../../todo-store';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [
        TodoStore,
        {
          provide: TodoService,
          useClass: TodoServiceImpl,
        },
        {
          provide: ApiService,
          useClass: ApiServiceFakeImpl,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
