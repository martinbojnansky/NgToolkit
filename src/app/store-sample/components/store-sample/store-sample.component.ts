import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ObservableUnsubscriber } from 'dist/ng-toolkit-lib';
import { filter, tap } from 'rxjs/operators';
import { TranslationService } from 'src/app/translation/translation.module';
import { StoreSampleService } from '../../services/store-sample.service';
import { StoreSampleQueries } from '../../store-sample-queries';

@Component({
  selector: 'app-store-sample',
  templateUrl: './store-sample.component.html',
  styleUrls: ['./store-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreSampleComponent implements OnInit, OnDestroy {
  constructor(
    public query: StoreSampleQueries,
    protected storeSampleService: StoreSampleService,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.updateList();
    this.subscribeErrors();
  }

  ngOnDestroy(): void {
    this.unsubscriber.destroy();
  }

  updateList(): void {
    this.storeSampleService
      .readItems()
      .pipe(this.unsubscriber.onDestroyOrResubscribe('updateList'))
      .subscribe();
  }

  subscribeErrors(): void {
    this.query.changes$.pipe(
      filter((c) => c.action === 'readStoreSamplesFailed'),
      tap((c) => alert(`Loading failed.`)),
      this.unsubscriber.onDestroyOrResubscribe('subscribeErrors')
    );
  }

  protected unsubscriber = new ObservableUnsubscriber<
    'updateList' | 'subscribeErrors'
  >();
}
