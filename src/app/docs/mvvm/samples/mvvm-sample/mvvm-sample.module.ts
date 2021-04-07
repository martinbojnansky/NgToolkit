import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MvvmModule } from 'dist/ng-toolkit-lib';
import { FormControlComponent } from './components/form-control/form-control.component';
import { MvvmSampleRoutingModule } from './mvvm-sample-routing.module';
import { SampleService } from './services/samples/sample.service';
import { SampleDetailViewComponent } from './views/samples/sample-detail-view/sample-detail-view.component';
import { SamplesViewComponent } from './views/samples/samples-view/samples-view.component';

@NgModule({
  declarations: [
    FormControlComponent,
    SampleDetailViewComponent,
    SamplesViewComponent,
  ],
  imports: [
    CommonModule,
    MvvmSampleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MvvmModule,
  ],
  providers: [SampleService],
})
export class MvvmSampleModule { }
