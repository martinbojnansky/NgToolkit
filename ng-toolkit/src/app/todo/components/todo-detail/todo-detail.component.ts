import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { nameof } from 'ng-toolkit-lib';
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
  
  constructor(protected store: Store, protected changeDetectorRef: ChangeDetectorRef, protected todoService: TodoService, protected activatedRoute: ActivatedRoute) {
    super(store, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscribeSafe('paramsChanged', this.activatedRoute.params, { next: params => {
      this.subscribeSafe('updateDetail', this.todoService.readItem(params[nameof<TodoDetail>('id')]), null);
    }})
  }

  protected onStateChange(change: StateChange): void {
    if(change.propChanges[nameof<State>('todo')]) {
      this.markForChangeDetection();
    }
  }
}
