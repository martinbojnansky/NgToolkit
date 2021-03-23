import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SamplesViewModel } from '../../view-models/samples-view-model';

@Component({
  selector: 'app-samples-view',
  templateUrl: './samples-view.component.html',
  styleUrls: ['./samples-view.component.scss'],
  providers: [SamplesViewModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamplesViewComponent implements OnInit {
  constructor(public vm: SamplesViewModel) {}

  ngOnInit(): void {
    this.vm.onInit();
  }
}
