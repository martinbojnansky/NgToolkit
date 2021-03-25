import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ViewModel } from 'dist/ng-toolkit-lib';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SamplesViewModel extends ViewModel {
  form = new FormGroup({
    text: new FormControl('FormControl Text'),
    bool: new FormControl(true),
  });

  text$ = new BehaviorSubject<string>('Observable Text');

  constructor() {
    super();
    this.init();
  }
}
