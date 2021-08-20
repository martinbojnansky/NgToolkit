import { NgModule } from '@angular/core';
import { PreventDefaultDirective } from './prevent-default.directive';
import { StopPropagationDirective } from './stop-propagation.directive';

@NgModule({
  declarations: [PreventDefaultDirective, StopPropagationDirective],
  exports: [PreventDefaultDirective, StopPropagationDirective],
  imports: [],
  providers: [],
})
export class AccessibilityModule {}
