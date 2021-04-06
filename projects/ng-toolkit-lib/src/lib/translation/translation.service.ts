import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TranslationConfig<TLang, TModules> {
  getLang: () => TLang;
  setLang: (lang: TLang) => void;
  importLang: (
    module: keyof TModules,
    lang: TLang
  ) => Promise<Partial<{ [TKey in keyof TModules]: TModules[TKey] }>>;
}

export class TranslationServiceBase<TLang, TModules> {
  get lang(): TLang {
    return this._lang;
  }

  get modules(): Partial<TModules> {
    return this._modules;
  }

  constructor(config: TranslationConfig<TLang, TModules>) {
    this._config = config;
    this._lang = this._config.getLang();
  }

  load(module: keyof TModules): Observable<boolean> {
    if (this._modules[module]) {
      return of(true);
    }

    return from(this._config.importLang(module, this.lang)).pipe(
      map(
        (m) => {
          this._modules = {
            ...this.modules,
            [module]: m[module],
          };
          return true;
        },
        () => {
          return false;
        }
      )
    );
  }

  changeLang(lang: TLang): void {
    this._config.setLang(lang);
  }

  private _config: TranslationConfig<TLang, TModules>;
  private _lang: TLang;
  private _modules: Partial<TModules> = {};
}
