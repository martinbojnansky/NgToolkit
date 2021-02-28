import { NgModule } from '@angular/core';
import { AppTestingModule } from '../app-testing.module';
import { StoreSampleModule } from './store-sample.module';

@NgModule({
  imports: [AppTestingModule, StoreSampleModule],
})
export class StoreSampleTestingModule {}
