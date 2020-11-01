import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { nameof } from 'ng-toolkit-lib';
import { State, StateChange, Store, StoreComponent } from 'src/app/store';
import { TodoService } from '../../services';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent extends StoreComponent {  
  get todos() {
    return this.store.state.todos
  }

  // TODO: Update list on display only if no items in state
  
  constructor(protected store: Store, protected changeDetectorRef: ChangeDetectorRef, protected todoService: TodoService) {
    super(store, changeDetectorRef);
  }

  add(title: string): void {
    this.subscribeSafe('add', this.todoService.createItem(title), null);
  }

  protected onStateChange(change: StateChange): void {
    if(change.propChanges[nameof<State>('todos')]) {
      this.markForChangeDetection();
    }
  }
}
