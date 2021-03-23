import { NgModule } from '@angular/core';
import { AppTestingModule } from '../app-testing.module';
import { MvvmSampleModule } from './mvvm-sample.module';

@NgModule({
  imports: [AppTestingModule, MvvmSampleModule],
})
export class MvvmSampleTestingModule {}
