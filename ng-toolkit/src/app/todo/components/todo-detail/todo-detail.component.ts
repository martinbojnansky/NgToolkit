import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';
import { StateChange, Store, StoreComponent } from 'src/app/store';
import { TodoDetail } from '../../models';
import { TodoService } from '../../services/todo/todo.service';
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailComponent extends StoreComponent implements OnInit {
  get todo() {
    return this.store.state.todo;
  }

  get isEditEnabled() {
    return this.todo?.item?.id;
  }

  readonly formGroup = this.formBuilder.group(<
    { [key in keyof TodoDetail]: any }
  >{
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    completed: [false],
  });

  constructor(
    protected store: Store,
    protected changeDetectorRef: ChangeDetectorRef,
    protected todoService: TodoService,
    protected activatedRoute: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected router: Router
  ) {
    super(store, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setupParamsObserver();
    this.setupAutoSave();
  }

  setupParamsObserver(): void {
    this.subscribeSingle('paramsChanged', this.activatedRoute.params, {
      next: (params) => {
        this.formGroup.reset();
        this.subscribeSingle(
          'updateDetail',
          this.todoService.readItem(params['id']),
          null
        );
      },
    });
  }

  setupAutoSave(): void {
    this.subscribeSingle(
      'autoSave',
      this.formGroup.valueChanges.pipe(
        tap(() => {
          const saveSubscription = this.subscriptions['save'];
          if (this.formGroup.dirty && saveSubscription) {
            saveSubscription.unsubscribe();
          }
        }),
        debounceTime(2000)
      ),
      {
        next: () => {
          if (this.formGroup.dirty) {
            this.save();
          }
        },
      }
    );
  }

  save() {
    this.subscribeSingle(
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
      this.subscribeSingle(
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

  protected onStateChange(change: StateChange): void {
    if (change.propChanges.todo) {
      this.markForChangeDetection();
    }
  }
}
