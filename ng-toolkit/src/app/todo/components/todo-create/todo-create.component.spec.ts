import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import {
  ApiService,
  ApiServiceFakeImpl,
} from 'src/app/core/services/api.service';
import { TodoService, TodoServiceImpl } from '../../services/todo/todo.service';
import { TodoStore } from '../../todo-store';

import { TodoCreateComponent } from './todo-create.component';

describe('TodoCreateComponent', () => {
  let component: TodoCreateComponent;
  let fixture: ComponentFixture<TodoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoCreateComponent],
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
        FormBuilder,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
