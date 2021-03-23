import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ViewModel } from 'dist/ng-toolkit-lib';

@Injectable()
export class SamplesViewModel extends ViewModel {
  editable = new FormControl(true);

  onInit(): void {
    this.changes$.next(1);
    this.editable.valueChanges
      .pipe(this.unsubscriber.onDestroy())
      .subscribe((v) => {
        this.editable.patchValue(v, { emitEvent: false });
        this.changes$.next(this.changes$.value + 1);
      });
  }
}
