import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ViewModel } from 'dist/ng-toolkit-lib';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SamplesViewModel extends ViewModel {
  get formSamples(): FormArray {
    return this.form.get('samples') as FormArray;
  }

  form = new FormGroup({
    text: new FormControl('FormControl Text'),
    bool: new FormControl(true),
    samples: new FormArray([new FormControl(), new FormControl()]),
  });

  text$ = new BehaviorSubject<string>('Observable Text');

  constructor() {
    super();
    this.init();
  }

  addSample(): void {
    this.formSamples.push(new FormControl());
  }

  removeSample(index: number): void {
    this.formSamples.removeAt(index);
  }
}
