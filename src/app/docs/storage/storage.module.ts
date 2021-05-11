import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StorageRoutingModule } from './storage-routing.module';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [
  
    OverviewComponent
  ],
  imports: [StorageRoutingModule, SharedModule],
})
export class StorageModule { }
