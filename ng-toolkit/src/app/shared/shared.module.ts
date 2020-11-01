import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';

@NgModule({
  declarations: [LoadingOverlayComponent, LoadingOverlayComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingOverlayComponent]
})
export class SharedModule { }
