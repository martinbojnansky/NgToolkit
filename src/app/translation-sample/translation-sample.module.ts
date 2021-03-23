import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslationPipe } from '../translation/translation.module';
import { TranslationSampleRoutingModule } from './translation-sample-routing.module';
import { TranslationSampleComponent } from './translation-sample.component';

@NgModule({
  declarations: [TranslationSampleComponent, TranslationPipe],
  imports: [CommonModule, TranslationSampleRoutingModule],
})
export class TranslationSampleModule {}
