import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SamplesViewModel } from 'src/app/mvvm-sample/view-models/samples/samples-view-model';

@Component({
  selector: 'app-samples-view',
  templateUrl: './samples-view.component.html',
  styleUrls: ['./samples-view.component.scss'],
  providers: [SamplesViewModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamplesViewComponent {
  constructor(public vm: SamplesViewModel) {}
}
