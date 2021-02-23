import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ObservableStateChange,
  ObservableStoreComponent,
} from 'ng-toolkit-lib';
import { debounceTime, tap } from 'rxjs/operators';
import { TodoAction, TodoState, TodoStore } from 'src/app/todo/todo-store';
import { TodoDetail } from '../../models';
import { TodoService } from '../../services/todo/todo.service';
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailComponent
  extends ObservableStoreComponent<TodoState, TodoAction>
  implements OnInit {
  get todo() {
    return this.todoStore.state.todo;
  }

  get editEnabled() {
    return (this.todo?.item && !this.todo?.isBusy) || this.formGroup.dirty;
  }

  readonly formGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: [''],
    completed: [false],
  } as { [key in keyof TodoDetail]: any });

  constructor(
    protected todoStore: TodoStore,
    protected changeDetectorRef: ChangeDetectorRef,
    protected todoService: TodoService,
    protected activatedRoute: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected router: Router
  ) {
    super(todoStore, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setupParamsObserver();
    this.setupAutoSave();
  }

  setupParamsObserver(): void {
    this.subscribeSafe('paramsChanged', this.activatedRoute.params, {
      next: (params) => {
        this.formGroup.reset();
        this.subscribeSafe(
          'updateDetail',
          this.todoService.readItem(params.id),
          null
        );
      },
    });
  }

  setupAutoSave(): void {
    this.subscribeSafe(
      'autoSave',
      this.formGroup.valueChanges.pipe(
        tap(() => {
          const saveSubscription = this.subscriptions.save;
          if (this.formGroup.dirty && saveSubscription) {
            saveSubscription.unsubscribe();
          }
        }),
        debounceTime(2000)
      ),
      {
        next: () => {
          if (this.formGroup.dirty && this.formGroup.valid) {
            this.save();
          }
        },
      }
    );
  }

  save() {
    this.subscribeSafe(
      'save',
      this.todoService.updateItem({
        ...this.todo.item,
        ...this.formGroup.value,
      }),
      null
    );
  }

  delete() {
    if (
      confirm(`Are you sure you want to delete todo: ${this.todo?.item?.title}`)
    ) {
      this.subscribeSafe(
        'delete',
        this.todoService.deleteItem(this.todo?.item?.id),
        {
          complete: () => {
            this.router.navigate(['..'], { relativeTo: this.activatedRoute });
          },
        }
      );
    }
  }

  protected onStateChange(
    change: ObservableStateChange<TodoState, TodoAction>
  ): void {
    if (change.propChanges.todo) {
      this.markForChangeDetection();
    }
  }
}
