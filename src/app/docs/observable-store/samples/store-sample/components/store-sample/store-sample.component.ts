import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ObservableUnsubscriber, View } from 'dist/ng-toolkit-lib';
import { filter, tap } from 'rxjs/operators';
import { StoreSampleService } from '../../services/store-sample.service';
import { StoreSampleStore } from '../../store-sample-store';

@Component({
  selector: 'app-store-sample',
  templateUrl: './store-sample.component.html',
  styleUrls: ['./store-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@View()
export class StoreSampleComponent implements OnInit, OnDestroy {
  constructor(
    protected store: StoreSampleStore,
    protected cd: ChangeDetectorRef,
    public storeSampleService: StoreSampleService
  ) {}

  ngOnInit(): void {
    this.updateList();
    this.subscribeErrors();
  }

  ngOnDestroy(): void {}

  updateList(): void {
    this.storeSampleService
      .readItems()
      .pipe(this.unsubscriber.onDestroyOrResubscribe('updateList'))
      .subscribe();
  }

  subscribeErrors(): void {
    this.store.changes$.pipe(
      filter((c) => c.action === 'readStoreSamplesFailed'),
      tap((c) => alert(`Loading failed.`)),
      this.unsubscriber.onDestroyOrResubscribe('subscribeErrors')
    );
  }

  protected readonly unsubscriber = new ObservableUnsubscriber<
    'updateList' | 'subscribeErrors'
  >();
}
