import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StorageRoutingModule } from './storage-routing.module';

@NgModule({
  declarations: [],
  imports: [StorageRoutingModule, SharedModule],
})
export class StorageModule {}
