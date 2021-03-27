import { Inject, Injectable, Optional } from '@angular/core';
import {
  ViewModelContext,
  ViewModelContextDirective,
} from 'dist/ng-toolkit-lib';
import { SampleDetail } from '../../models/samples/samples';
import { SampleService } from '../../services/samples/sample.service';
import { CrudDetailViewModel } from '../crud/crud-detail-view-model';
import { SamplesViewModel } from './samples-view-model';

@Injectable()
export class SampleDetailViewModel extends CrudDetailViewModel<SampleDetail> {
  constructor(
    public samples: SamplesViewModel,
    @Optional()
    @Inject(ViewModelContextDirective)
    public context: ViewModelContext<{ index: number }>,
    protected crudService: SampleService
  ) {
    super();
    this.init(samples);
  }
}
