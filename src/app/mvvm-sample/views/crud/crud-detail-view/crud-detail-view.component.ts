import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CrudDetailViewModel } from 'src/app/mvvm-sample/view-models/crud/crud-detail-view-model';

@Component({
  selector: 'app-crud-detail-view',
  templateUrl: './crud-detail-view.component.html',
  styleUrls: ['./crud-detail-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudDetailViewComponent implements OnInit {
  constructor(public vm: CrudDetailViewModel) {}

  ngOnInit(): void {
    this.vm.load(1);
  }
}
