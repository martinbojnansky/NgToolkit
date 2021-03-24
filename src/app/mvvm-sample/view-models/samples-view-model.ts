import { Injectable } from '@angular/core';
import { ViewModel } from 'dist/ng-toolkit-lib';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SamplesViewModel extends ViewModel {
  editable$ = new BehaviorSubject<boolean>(true);

  constructor() {
    super();
    this.observeProperties();
  }
}
