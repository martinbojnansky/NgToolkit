import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ObservableStoreRoutingModule } from './observable-store-routing.module';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    ObservableStoreRoutingModule,
    SharedModule
  ],
})
export class ObservableStoreModule { }
