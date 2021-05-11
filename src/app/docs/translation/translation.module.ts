import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { TranslationRoutingModule } from './translation-routing.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    TranslationRoutingModule,
    SharedModule
  ],
})
export class TranslationModule { }
