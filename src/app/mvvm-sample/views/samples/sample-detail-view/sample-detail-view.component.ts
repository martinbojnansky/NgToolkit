import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CrudDetailViewModel } from 'src/app/mvvm-sample/view-models/crud/crud-detail-view-model';
import { SampleDetailViewModel } from 'src/app/mvvm-sample/view-models/samples/sample-detail-view-model';

@Component({
  selector: 'app-sample-detail-view',
  templateUrl: './sample-detail-view.component.html',
  styleUrls: ['./sample-detail-view.component.scss'],
  providers: [
    SampleDetailViewModel,
    { provide: CrudDetailViewModel, useExisting: SampleDetailViewModel },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleDetailViewComponent {
  constructor(public vm: SampleDetailViewModel) {}
}
