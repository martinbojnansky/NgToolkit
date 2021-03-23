import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CrudDetailViewModel } from '../../view-models/crud-detail-view-model';

@Component({
  selector: 'app-crud-actions-view',
  templateUrl: './crud-actions-view.component.html',
  styleUrls: ['./crud-actions-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudActionsViewComponent implements OnInit {
  constructor(public vm: CrudDetailViewModel) {}

  ngOnInit(): void {}
}
