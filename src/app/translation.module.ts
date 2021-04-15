import { Injectable, NgModule, Pipe, PipeTransform } from '@angular/core';
import {
  TranslationGuard,
  TranslationPipeBase,
  TranslationServiceBase,
  trySafe,
} from 'dist/ng-toolkit-lib';

export enum TranslationLang {
  en = 'en',
  de = 'de',
}

export interface TranslationModules {
  translationSample: {
    welcomeMessage: string;
    welcomeMessageParametrized: (name: string) => string;
    welcomeMessageCombined: (name: string) => string;
    translationLangLabel: (lang: TranslationLang) => string;
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
        const getInitialLang = () => {
          const intlLang = (trySafe(() =>
            Intl.NumberFormat().resolvedOptions().locale.substr(0, 2)
          ) as any) as TranslationLang;
          const intlLangSupported = Object.keys(TranslationLang)
            .map((k) => TranslationLang[k])
            .includes(intlLang);
          return intlLangSupported ? intlLang : TranslationLang.en;
        };

        return (localStorage.getItem('lang') as any) || getInitialLang();
      },
      setLang: (lang) => {
        localStorage.setItem('lang', lang);
        window.location.reload();
      },
      importLang: (module, lang) => {
        return import(`src/translations/${module}/${lang}`);
      },
    });
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
