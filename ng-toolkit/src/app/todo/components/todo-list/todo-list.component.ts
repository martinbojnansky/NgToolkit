import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { StateChange, Store, StoreComponent } from 'src/app/store';
import { TodoService } from '../../services/todo/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent extends StoreComponent implements OnInit {
  get todos() {
    return this.store.state.todos;
  }

  get isCreating() {
    const createSubscription = this.subscriptions['create'];
    return createSubscription && !createSubscription.closed;
  }

  constructor(
    protected store: Store,
    protected changeDetectorRef: ChangeDetectorRef,
    protected todoService: TodoService
  ) {
    super(store, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.update();
  }

  create(title: string) {
    this.subscribeSingle('create', this.todoService.createItem(title), null);
  }

  update() {
    this.subscribeSingle(
      'update',
      this.todoService.readItems().pipe(debounceTime(500)),
      null
    );
  }

  protected onStateChange(change: StateChange): void {
    switch (change.action) {
      case 'updateTodoCompleted':
      case 'createTodoCompleted':
      case 'deleteTodoCompleted':
        this.update();
        break;
    }

    if (change.propChanges.todos) {
      this.markForChangeDetection();
    }
  }
}
