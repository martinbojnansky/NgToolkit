import { Injectable, NgModule, Pipe, PipeTransform } from '@angular/core';
import {
  TranslationGuard,
  TranslationPipeBase,
  TranslationServiceBase,
} from 'dist/ng-toolkit-lib';

export type TranslationLang = 'en' | 'de';

export interface TranslationModules {
  translationSample: {
    welcomeMessage: string;
    welcomeMessageParametrized: (name: string) => string;
    translationLangLabel: (lang: TranslationLang) => string;
  };
}

@Injectable()
export class TranslationService extends TranslationServiceBase<
  TranslationLang,
  TranslationModules
> {
  constructor() {
    super();
  }
}

@Pipe({
  name: 'translate',
  pure: true,
})
export class TranslationPipe
  extends TranslationPipeBase<TranslationLang, TranslationModules>
  implements PipeTransform {
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
