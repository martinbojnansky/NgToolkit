import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SampleDetail } from '../models/sample';
import { SampleService } from '../services/sample.service';
import { CrudDetailViewModel } from './crud-detail-view-model';
import { SamplesViewModel } from './samples-view-model';

@Injectable()
export class SampleDetailViewModel extends CrudDetailViewModel<SampleDetail> {
  readonly editable = this.samplesViewModel.editable;

  detail: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    type: new FormControl(),
  });

  constructor(
    protected samplesViewModel: SamplesViewModel,
    protected crudService: SampleService
  ) {
    super();
  }

  onInit(): void {
    super.onInit();
    this.editable.valueChanges
      .pipe(this.unsubscriber.onDestroy())
      .subscribe((v) => {
        this.editable.patchValue(v, { emitEvent: false });
        this.changes$.next(this.changes$.value + 1);
      });
  }
}
