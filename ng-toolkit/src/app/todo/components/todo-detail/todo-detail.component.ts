import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscribableComponent } from 'ng-toolkit-lib';
import { debounceTime, map, tap } from 'rxjs/operators';
import { TodoDetail } from '../../models';
import { TodoService } from '../../services/todo/todo.service';
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailComponent
  extends SubscribableComponent
  implements OnInit {
  readonly props$ = this.todoService.stateChange$.pipe(
    map((sc) => ({
      todo: sc.state.todo,
      editEnabled: sc.getters.editEnabled,
    })),
    tap((x) => console.log(`${this.constructor.name} props updated:`, x))
  );

  readonly formGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: [''],
    completed: [false],
  } as { [key in keyof TodoDetail]: any });

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected todoService: TodoService
  ) {
    super();
  }

  ngOnInit() {
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
        ...this.props$['value'].todo.item,
        ...this.formGroup.value,
      }),
      null
    );
  }

  delete() {
    if (
      confirm(
        `Are you sure you want to delete todo: ${this.props$['value'].todo?.item?.title}`
      )
    ) {
      this.subscribeSafe(
        'delete',
        this.todoService.deleteItem(this.props$['value'].todo?.item?.id),
        {
          complete: () => {
            this.router.navigate(['..'], { relativeTo: this.activatedRoute });
          },
        }
      );
    }
  }
}
