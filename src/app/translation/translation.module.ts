import { Injectable, NgModule, Pipe } from '@angular/core';
import {
  TranslationGuard,
  TranslationPipe as TranslationPipeBase,
  TranslationService as TranslationServiceBase,
} from 'dist/ng-toolkit-lib';

export type TranslationLang = 'en' | 'de';

export interface TranslationModules {
  storeSample: {
    welcomeMessage: string;
  };
}

@Injectable()
export class TranslationService extends TranslationServiceBase<
  TranslationLang,
  TranslationModules
> {
  constructor() {
    super({
      getLang: () => {
        return (
          (Intl.NumberFormat().resolvedOptions().locale.substr(0, 2) as any) ||
          'en'
        );
      },
      importLang: (module: keyof TranslationModules, lang: TranslationLang) => {
        return import(`src/app/translation/${module}/${lang}`);
      },
    });
  }
}

@Pipe({
  name: 'translate',
  pure: true,
})
export class TranslationPipe extends TranslationPipeBase<TranslationModules> {
  constructor(protected translationService: TranslationService) {
    super(translationService);
  }
}

@NgModule({
  providers: [
    TranslationService,
    {
      provide: TranslationGuard,
      deps: [TranslationService],
      useFactory: (translationService: TranslationService) =>
        new TranslationGuard(translationService),
    },
  ],
})
export class TranslationModule {}
