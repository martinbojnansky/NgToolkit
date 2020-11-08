import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDirective, FormDraftGuard, FormDraftService, FormDraftServiceImpl } from './forms';
import { AutofocusDirective, FocusWithinDirective } from './focus';
import { SubscribableComponent } from './rxjs';
import { ObservableStoreComponent } from './store/observable-store.component';

@NgModule({
  declarations: [
    FormDirective,
    FocusWithinDirective,
    AutofocusDirective,
    SubscribableComponent,
    ObservableStoreComponent,
  ],
  imports: [CommonModule],
  exports: [
    FormDirective,
    FocusWithinDirective,
    AutofocusDirective,
    SubscribableComponent,
    ObservableStoreComponent,
  ],
  providers: [
    {
      provide: FormDraftService,
      useClass: FormDraftServiceImpl
    },
    FormDraftGuard
  ]
})
export class NgToolkitLibModule {}