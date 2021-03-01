import { Injectable, NgModule } from '@angular/core';
import { TranslationService as TranslationServiceBase } from 'dist/ng-toolkit-lib';
import { TranslationGuard } from './translation.guard';

export type TranslationLang = 'en' | 'de';

export interface TranslationModules {
  storeSample: {
    welcomeMessage: string;
    refreshButtonTitle: string;
  };
}

@Injectable()
export class TranslationService extends TranslationServiceBase<
  TranslationLang,
  TranslationModules
> {
  constructor() {
    super({
      getLang: () => 'en',
      importLang: (module: keyof TranslationModules, lang: TranslationLang) =>
        import(`src/app/translation/${module}/${lang}`),
    });
  }
}

@NgModule({
  providers: [TranslationService, TranslationGuard],
})
export class TranslationModule {}
