import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TRANSLATION_SERVICE } from 'dist/ng-toolkit-lib';
import { TranslationService } from './services/translation.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    TranslationService,
    {
      provide: TRANSLATION_SERVICE,
      useExisting: TranslationService,
    },
  ],
})
export class CoreModule {}
