import { Injectable } from '@angular/core';
import { TranslationServiceBase, trySafe } from 'dist/ng-toolkit-lib';
import { TranslationLang, TranslationModules } from '../../../translations/config';

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
        return import(`src/app/docs/translation/samples/translation-sample/translations/${module}/${lang}`);
      },
    });
  }
}
