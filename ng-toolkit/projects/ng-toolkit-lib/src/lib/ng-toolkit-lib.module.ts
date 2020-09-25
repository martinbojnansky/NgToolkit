import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDirective } from './forms';
import { AutofocusDirective, FocusWithinDirective } from './focus';
import { SubscribableComponent } from './rxjs';
import { StoreComponent } from './store/store.component';

@NgModule({
  declarations: [
    FormDirective,
    FocusWithinDirective,
    AutofocusDirective,
    SubscribableComponent,
    StoreComponent,
  ],
  imports: [CommonModule],
  exports: [
    FormDirective,
    FocusWithinDirective,
    AutofocusDirective,
    SubscribableComponent,
    StoreComponent,
  ],
})
export class NgToolkitLibModule {}
