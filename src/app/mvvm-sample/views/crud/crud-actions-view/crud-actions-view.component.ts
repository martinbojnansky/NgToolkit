import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CrudDetailViewModel } from 'src/app/mvvm-sample/view-models/crud/crud-detail-view-model';

@Component({
  selector: 'app-crud-actions-view',
  templateUrl: './crud-actions-view.component.html',
  styleUrls: ['./crud-actions-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudActionsViewComponent {
  constructor(public vm: CrudDetailViewModel) {}
}
