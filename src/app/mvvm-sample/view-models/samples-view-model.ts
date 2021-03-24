import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ViewModel } from 'dist/ng-toolkit-lib';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SamplesViewModel extends ViewModel {
  editable$ = new BehaviorSubject<boolean>(true);

  form = new FormGroup({
    editable: new FormControl(),
    text: new FormControl('intial text'),
  });

  constructor() {
    super();
    this.init();
  }
}
