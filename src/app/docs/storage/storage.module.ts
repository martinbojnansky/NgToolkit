import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { StorageRoutingModule } from './storage-routing.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [StorageRoutingModule, SharedModule],
})
export class StorageModule { }
