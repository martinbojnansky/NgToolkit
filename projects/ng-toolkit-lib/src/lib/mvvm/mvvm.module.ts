import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewModelContextDirective } from './view-model-context.directive';

@NgModule({
  declarations: [ViewModelContextDirective],
  imports: [CommonModule],
  exports: [ViewModelContextDirective],
})
export class MvvmModule {}
