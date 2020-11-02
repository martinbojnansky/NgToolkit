import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  readonly formGroup = this.formBuilder.group({
    [nameof<TodoDetail>('title')]: ['',  [Validators.required, Validators.minLength(2)]],
    [nameof<TodoDetail>('description')]: [''],
    [nameof<TodoDetail>('completed')]: [false]
  })
  
  constructor(protected store: Store, protected changeDetectorRef: ChangeDetectorRef, protected todoService: TodoService, protected activatedRoute: ActivatedRoute,
    protected formBuilder: FormBuilder) {
    super(store, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    
    this.subscribeSafe('paramsChanged', this.activatedRoute.params, { next: params => {
      this.reset();
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

  reset() {
    this.formGroup.reset();
  }

  delete() {
    alert('not implemented');
  }

  protected onStateChange(change: StateChange): void {
    if(change.propChanges[nameof<State>('todo')]) {
      this.markForChangeDetection();
    }
  }
}
