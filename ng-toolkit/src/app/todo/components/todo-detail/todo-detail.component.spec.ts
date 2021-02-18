import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ApiService,
  ApiServiceFakeImpl,
} from 'src/app/core/services/api.service';
import { TodoService, TodoServiceImpl } from '../../services/todo/todo.service';
import { TodoStore } from '../../todo-store';
import { TodoDetailComponent } from './todo-detail.component';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [TodoDetailComponent],
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
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
