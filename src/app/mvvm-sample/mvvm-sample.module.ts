import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MvvmSampleRoutingModule } from './mvvm-sample-routing.module';
import { SampleService } from './services/sample.service';
import { CrudActionsViewComponent } from './views/crud-actions-view/crud-actions-view.component';
import { CrudDetailViewComponent } from './views/crud-detail-view/crud-detail-view.component';
import { SampleDetailViewComponent } from './views/sample-detail-view/sample-detail-view.component';
import { SamplesViewComponent } from './views/samples-view/samples-view.component';

@NgModule({
  declarations: [
    CrudDetailViewComponent,
    CrudActionsViewComponent,
    SampleDetailViewComponent,
    SamplesViewComponent,
  ],
  imports: [
    CommonModule,
    MvvmSampleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SampleService],
})
export class MvvmSampleModule {}
