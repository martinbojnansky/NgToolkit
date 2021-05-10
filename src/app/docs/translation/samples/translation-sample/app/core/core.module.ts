import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslationGuard } from 'dist/ng-toolkit-lib';
import { TranslationService } from './services/translation.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    TranslationService,
    {
      provide: TranslationGuard,
      deps: [TranslationService],
      useFactory: (translationService: TranslationService) =>
        new TranslationGuard(translationService),
    },
  ]
})
export class CoreModule { }
