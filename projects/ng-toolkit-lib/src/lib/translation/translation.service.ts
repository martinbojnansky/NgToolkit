import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TranslationConfig<TLang, TModules> {
  getLang: () => TLang;
  importLang: (
    module: keyof TModules,
    lang: TLang
  ) => Promise<Partial<{ [TKey in keyof TModules]: TModules[TKey] }>>;
}

export abstract class TranslationService<TLang, TModules> {
  get lang(): TLang {
    return this._lang;
  }

  get modules(): Partial<TModules> {
    return this._modules;
  }

  get config() {
    return this._config;
  }

  constructor(private _config: TranslationConfig<TLang, TModules>) {
    this._lang = this.config.getLang();
  }

  load(module: keyof TModules): Observable<boolean> {
    if (this._modules[module]) {
      return of(true);
    }

    return from(this.config.importLang(module, this.lang)).pipe(
      map(
        (m) => {
          this._modules = <any>{
            ...this.modules,
            [module]: m[module],
          };
          console.log(m, this._modules);
          return true;
        },
        () => {
          return false;
        }
      )
    );
  }

  private _lang: TLang;
  private _modules: Partial<TModules> = {};
}
