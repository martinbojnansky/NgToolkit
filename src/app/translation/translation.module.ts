import { Injectable, NgModule } from '@angular/core';
import { TranslationService as TranslationServiceBase } from 'dist/ng-toolkit-lib';
import { TranslationGuard } from './translation.guard';

export type TranslationLang = 'en' | 'de';

export interface TranslationValues {
  welcomeMessage: string;
}

@Injectable()
export class TranslationService extends TranslationServiceBase<
  TranslationLang,
  TranslationValues
> {
  constructor() {
    super(localStorage, {
      defaultLang: 'en',
      onImportLang: (
        lang: TranslationLang
      ): Promise<{ localizedValues: TranslationValues }> =>
        import(`src/app/translation/${lang}`),
    });
  }
}

@NgModule({
  providers: [TranslationService, TranslationGuard],
})
export class TranslationModule {}
