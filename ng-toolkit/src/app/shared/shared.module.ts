import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToolkitLibModule } from 'ng-toolkit-lib';
import { FormDirective } from 'projects/ng-toolkit-lib/src/lib/forms';

@NgModule({
  declarations: [LoadingOverlayComponent, LoadingOverlayComponent, FormDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgToolkitLibModule
  ],
  exports: [
    ReactiveFormsModule,
    LoadingOverlayComponent,
    NgToolkitLibModule
  ],
  providers: []
})
export class SharedModule { }
