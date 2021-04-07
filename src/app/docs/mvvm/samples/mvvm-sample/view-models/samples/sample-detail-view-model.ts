import { Inject, Injectable, Optional } from '@angular/core';
import {
  ViewModel, ViewModelContext,
  ViewModelContextDirective
} from 'dist/ng-toolkit-lib';
import { BehaviorSubject } from 'rxjs';
import { SampleDetail } from '../../models/samples/samples';
import { SampleService } from '../../services/samples/sample.service';
import { SamplesViewModel } from './samples-view-model';

@Injectable()
export class SampleDetailViewModel extends ViewModel {
  detail$ = new BehaviorSubject<SampleDetail>({} as SampleDetail);

  constructor(
    public samples: SamplesViewModel,
    @Optional()
    @Inject(ViewModelContextDirective)
    public context: ViewModelContext<{ index: number }>,
    protected sampleService: SampleService
  ) {
    super();
    this.init(samples);
  }

  load(id: number): void {
    this.detail$.next({} as SampleDetail);
    this.sampleService
      .readDetail(id)
      .pipe(this.unsubscriber.onDestroyOrResubscribe('load'))
      .subscribe((detail) => {
        this.detail$.next(detail);
      });
  }
}
