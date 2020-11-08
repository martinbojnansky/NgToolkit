import { TestBed } from '@angular/core/testing';
import {
  ApiService,
  ApiServiceFakeImpl,
} from 'src/app/core/services/api.service';
import { TodoStore } from '../../todo-store';

import { TodoService, TodoServiceImpl } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
