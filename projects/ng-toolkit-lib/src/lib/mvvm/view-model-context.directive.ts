import {
  Directive,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { nameof } from '../helpers';

export interface ViewModelContext<T> {
  readonly value: T;
  readonly changes$: Observable<SimpleChange>;
}

@Directive({
  selector: '[vmContext]',
})
export class ViewModelContextDirective
  implements ViewModelContext<any>, OnChanges {
  get value(): any {
    return this.vmContext;
  }

  @Input()
  vmContext: any;

  readonly changes$ = new Subject<SimpleChange>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes[nameof<ViewModelContextDirective>('vmContext')];
    if (change) {
      this.changes$.next(change);
    }
  }
}
