import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ObservableUnsubscriber } from 'ng-toolkit-lib';
import { filter, tap } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import { TodoQueries } from '../../todo-queries';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit, OnDestroy {
  queries = this.todoQueries;

  constructor(
    protected todoQueries: TodoQueries,
    protected todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.updateList();
    this.subscribeErrors();
  }

  ngOnDestroy(): void {
    this.unsubscriber.destroy();
  }

  updateList(): void {
    this.todoService
      .readItems()
      .pipe(this.unsubscriber.onDestroyOrResubscribe('updateList'))
      .subscribe();
  }

  subscribeErrors(): void {
    this.queries.changes$.pipe(
      filter((c) => c.action === 'readTodosFailed'),
      tap((c) => alert(`Loading failed.`)),
      this.unsubscriber.onDestroyOrResubscribe('subscribeErrors')
    );
  }

  protected unsubscriber = new ObservableUnsubscriber<
    'updateList' | 'subscribeErrors'
  >();
}
