import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { asyncAction, nameof } from 'ng-toolkit-lib';
import { debounceTime } from 'rxjs/operators';
import {
  Action,
  State,
  StateChange,
  Store,
  StoreComponent,
} from 'src/app/store';
import { TodoService } from '../../services';

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
    if (
      [
        asyncAction(Action.updateTodo).completed,
        asyncAction(Action.deleteTodo).completed,
      ].includes(change.action)
    ) {
      this.update();
    }

    if (change.propChanges[nameof<State>('todos')]) {
      this.markForChangeDetection();
    }
  }
}
