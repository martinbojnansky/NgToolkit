import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ObservableStoreComponent } from 'ng-toolkit-lib';
import { ObservableStateChange } from 'projects/ng-toolkit-lib/src/lib/store';
import { TodoService } from '../../services/todo/todo.service';
import { TodoAction, TodoState, TodoStore } from '../../todo-store';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateComponent extends ObservableStoreComponent<
  TodoState,
  TodoAction
> {
  get busy(): boolean {
    return this.subscribed('create');
  }

  errorMessage: string;

  readonly formGroup = this.formBuilder.group({
    title: ['', []],
  });

  constructor(
    protected todoStore: TodoStore,
    protected changeDetectorRef: ChangeDetectorRef,
    protected formBuilder: FormBuilder,
    protected todoService: TodoService
  ) {
    super(todoStore, changeDetectorRef);
  }

  create() {
    this.errorMessage = null;
    if (!this.formGroup.value.title?.length) {
      return;
    }

    this.subscribeSafe(
      'create',
      this.todoService.createItem(this.formGroup.value.title),
      {
        error: (e: Error) => {
          this.errorMessage = `Todo could not be created. ${e.message}`;
        },
        complete: () => {
          this.formGroup.reset();
        },
      }
    );
  }

  protected onStateChange(
    change: ObservableStateChange<TodoState, TodoAction>
  ) {
    switch (change.action) {
      case 'createTodoStarted':
      case 'createTodoCompleted':
      case 'createTodoFailed':
        this.markForChangeDetection();
    }
  }
}
