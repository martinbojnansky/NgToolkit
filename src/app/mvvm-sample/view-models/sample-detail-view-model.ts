import { Injectable } from '@angular/core';
import { ParentProperty, WithParents } from 'dist/ng-toolkit-lib';
import { SampleDetail } from '../models/sample';
import { SampleService } from '../services/sample.service';
import { CrudDetailViewModel } from './crud-detail-view-model';
import { SamplesViewModel } from './samples-view-model';

@Injectable()
@WithParents()
export class SampleDetailViewModel extends CrudDetailViewModel<SampleDetail> {
  @ParentProperty(SampleDetailViewModel, 'samplesViewModel', 'editable')
  readonly isEditable: boolean;

  @ParentProperty(SampleDetailViewModel, 'samplesViewModel', 'editable')
  editable: boolean;

  constructor(
    public samplesViewModel: SamplesViewModel,
    protected crudService: SampleService
  ) {
    super();
  }
}
