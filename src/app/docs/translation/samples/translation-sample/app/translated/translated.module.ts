import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TranslationLangSwitchComponent } from './components/translation-lang-switch/translation-lang-switch.component';
import { TranslationSampleComponent } from './components/translation-sample/translation-sample.component';
import { TranslatedRoutingModule } from './translated-routing.module';

@NgModule({
  declarations: [
    TranslationSampleComponent,
    TranslationLangSwitchComponent,
  ],
  imports: [SharedModule, TranslatedRoutingModule],
})
export class TranslatedModule { }
