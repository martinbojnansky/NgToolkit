import { Injectable, Optional } from '@angular/core';
import { FormGroupName } from '@angular/forms';
import { SampleDetail } from '../../models/samples/samples';
import { SampleService } from '../../services/samples/sample.service';
import { CrudDetailViewModel } from '../crud/crud-detail-view-model';
import { SamplesViewModel } from './samples-view-model';

@Injectable()
export class SampleDetailViewModel extends CrudDetailViewModel<SampleDetail> {
  get index(): number {
    return Number(this.formGroupNameDirective?.name || null);
  }

  constructor(
    public samples: SamplesViewModel,
    protected crudService: SampleService,
    @Optional() protected formGroupNameDirective: FormGroupName
  ) {
    super();
    console.log(formGroupNameDirective);
    this.init(samples);
  }
}
