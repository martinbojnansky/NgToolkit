import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToolkitLibModule } from 'ng-toolkit-lib';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';

@NgModule({
  declarations: [LoadingOverlayComponent, LoadingOverlayComponent],
  imports: [CommonModule, NgToolkitLibModule, ReactiveFormsModule],
  exports: [NgToolkitLibModule, ReactiveFormsModule, LoadingOverlayComponent],
  providers: [],
})
export class SharedModule {}
