import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { nameof } from 'ng-toolkit-lib';
import { debounceTime } from 'rxjs/operators';
import { State, StateChange, Store, StoreComponent } from 'src/app/store';
import { TodoDetail } from '../../models';
import { TodoService } from '../../services';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailComponent extends StoreComponent implements OnInit {
  get todo() {
    return this.store.state.todo
  }

  readonly formGroup = this.formBuilder.group(<{[key in keyof TodoDetail]: any}>{
    'title': ['',  [Validators.required, Validators.minLength(2)]],
    'description': [''],
    'completed': [false]
  })
  
  constructor(protected store: Store, protected changeDetectorRef: ChangeDetectorRef, protected todoService: TodoService, protected activatedRoute: ActivatedRoute,
    protected formBuilder: FormBuilder, protected router: Router) {
    super(store, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    
    this.subscribeSafe('paramsChanged', this.activatedRoute.params, { next: params => {
      this.formGroup.reset();
      this.subscribeSafe('updateDetail', this.todoService.readItem(params[nameof<TodoDetail>('id')]), null);
    }});

    this.subscribeSafe('formValueChanged', this.formGroup.valueChanges.pipe(debounceTime(2000)), {
      next: () => {
        if(this.formGroup.dirty)
          this.save();
        }
    });
  }

  save() {
    this.subscribeSafe('save', this.todoService.updateItem({ ...this.todo.item, ...this.formGroup.value}), null);
  }

  delete() {
    if(confirm(`Are you sure you want to delete todo: ${this.todo?.item?.title}`)) {
      this.subscribeSafe('delete', this.todoService.deleteItem(this.todo?.item?.id), {
        complete: () => {
          this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        }
      });
    }
  }

  protected onStateChange(change: StateChange): void {
    if(change.propChanges[nameof<State>('todo')]) {
      this.markForChangeDetection();
    }
  }
}
