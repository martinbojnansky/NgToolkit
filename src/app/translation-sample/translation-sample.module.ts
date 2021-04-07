import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslationPipe } from 'src/app/translation.module';
import { TranslationLangSwitchComponent } from './components/translation-lang-switch/translation-lang-switch.component';
import { TranslationSampleComponent } from './components/translation-sample/translation-sample.component';
import { TranslationSampleRoutingModule } from './translation-sample-routing.module';

@NgModule({
  declarations: [
    TranslationSampleComponent,
    TranslationPipe,
    TranslationLangSwitchComponent,
  ],
  imports: [CommonModule, TranslationSampleRoutingModule],
})
export class TranslationSampleModule {}
