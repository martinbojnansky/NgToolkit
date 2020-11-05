import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { nameof } from 'ng-toolkit-lib';
import { TodoDetail } from '../../models/todo';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateComponent implements OnChanges {
  @Input()
  isBusy: boolean;

  @Output()
  onCreate: EventEmitter<string> = new EventEmitter();

  readonly formGroup = this.formBuilder.group(<
    { [key in keyof TodoDetail]: any }
  >{
    title: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(protected formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    const isBusyChange = changes[nameof<TodoCreateComponent>('isBusy')];
    if (isBusyChange.previousValue && !isBusyChange.currentValue) {
      this.formGroup.reset();
    }
  }

  create() {
    if (this.formGroup.valid) {
      this.onCreate.emit(this.formGroup.value[nameof<TodoDetail>('title')]);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
