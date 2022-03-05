import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslationRoutingModule } from './translation-routing.module';

@NgModule({
  declarations: [],
  imports: [TranslationRoutingModule, SharedModule],
})
export class TranslationModule {}
