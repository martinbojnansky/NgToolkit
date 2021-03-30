import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SampleDetailViewModel } from 'src/app/mvvm-sample/view-models/samples/sample-detail-view-model';

@Component({
  selector: 'app-sample-detail-view',
  templateUrl: './sample-detail-view.component.html',
  styleUrls: ['./sample-detail-view.component.scss'],
  providers: [SampleDetailViewModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleDetailViewComponent implements OnInit {
  constructor(public vm: SampleDetailViewModel) { }

  ngOnInit(): void {
    this.vm.load(1);
  }
}
