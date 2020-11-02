import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingOverlayComponent, LoadingOverlayComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    LoadingOverlayComponent
  ]
})
export class SharedModule { }
