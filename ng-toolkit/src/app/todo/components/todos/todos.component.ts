import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { TodoService } from '../../services/todo/todo.service';
import { TodoQueries } from '../../todo-queries';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  queries = this.todoQueries;
  changes$ = this.todoQueries.changes$.pipe(
    filter((sc) => !!sc.propChanges.todos)
  );

  constructor(
    protected todoQueries: TodoQueries,
    protected todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.todoService.readItems().subscribe();
  }
}
