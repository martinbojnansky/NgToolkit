import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToolkitLibModule } from 'ng-toolkit-lib';

@NgModule({
  declarations: [LoadingOverlayComponent, LoadingOverlayComponent],
  imports: [CommonModule, NgToolkitLibModule, ReactiveFormsModule],
  exports: [NgToolkitLibModule, ReactiveFormsModule, LoadingOverlayComponent],
  providers: [],
})
export class SharedModule {}
