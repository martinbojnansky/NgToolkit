import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppStore } from '../app-store';
import { StoreSampleComponent } from './components/store-sample/store-sample.component';
import {
  StoreSampleService,
  StoreSampleServiceImpl,
} from './services/store-sample.service';
import { StoreSampleQueries } from './store-sample-queries';
import { StoreSampleRoutingModule } from './store-sample-routing.module';
import { StoreSampleStore } from './store-sample-store';

@NgModule({
  declarations: [StoreSampleComponent],
  imports: [CommonModule, StoreSampleRoutingModule],
  providers: [
    {
      provide: StoreSampleStore,
      useExisting: AppStore,
    },
    StoreSampleQueries,
    {
      provide: StoreSampleService,
      useClass: StoreSampleServiceImpl,
    },
  ],
})
export class StoreSampleModule {}
