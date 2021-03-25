import { Injectable } from '@angular/core';
import { SampleDetail } from '../../models/samples/samples';
import { SampleService } from '../../services/samples/sample.service';
import { CrudDetailViewModel } from '../crud/crud-detail-view-model';
import { SamplesViewModel } from './samples-view-model';

@Injectable()
export class SampleDetailViewModel extends CrudDetailViewModel<SampleDetail> {
  get samplesForm() {
    return this.samplesViewModel.form;
  }

  get samplesText$() {
    return this.samplesViewModel.text$;
  }

  constructor(
    protected samplesViewModel: SamplesViewModel,
    protected crudService: SampleService
  ) {
    super();
    this.init(samplesViewModel);
  }
}
