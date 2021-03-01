import { Subject } from 'rxjs';

export interface TranslationConfig<TLang, TLocalizedValues> {
  defaultLang: TLang; // Get via lamda and use user locale as default
  onImportLang: (lang: TLang) => Promise<{ localizedValues: TLocalizedValues }>;
}

const LOCALE_SETTING_KEY = 'ngtl-lang'; // TODO: Get from config

export abstract class TranslationService<TLang, TLocalizedValues> {
  get lang() {
    return this._lang;
  }

  get values() {
    return this._values;
  }

  get config() {
    return this._config;
  }

  get isLangChanging$() {
    return this._isLangChanging$.asObservable();
  }

  constructor(
    protected storage: Storage,
    private _config: TranslationConfig<TLang, TLocalizedValues>
  ) {
    this.restoreLangSetting();
  }

  async changeLang(lang: TLang) {
    if (this.lang === lang) {
      return;
    }

    await this.setLang(lang);
  }

  private _lang: TLang;
  private _values: TLocalizedValues;
  private _isLangChanging$ = new Subject<boolean>();

  private async setLang(lang: TLang) {
    try {
      this._isLangChanging$.next(true);
      const m = await this.config.onImportLang(lang);
      this._lang = lang;
      this._values = m.localizedValues as TLocalizedValues;
      this.storage.setItem(LOCALE_SETTING_KEY, lang.toString());
    } catch (e) {
      throw new Error(`Lang ${lang} not supported. ${JSON.stringify(e)}`);
    } finally {
      this._isLangChanging$.next(false);
    }
  }

  private async setDefaultLang() {
    await this.setLang(this.config.defaultLang);
  }

  private async restoreLangSetting() {
    const langSetting = this.storage.getItem(LOCALE_SETTING_KEY);

    if (langSetting) {
      await this.setLang((langSetting as unknown) as TLang);
    } else {
      await this.setDefaultLang();
    }
  }
}
