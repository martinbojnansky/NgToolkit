import { Observable, Subject } from 'rxjs';
import { ILocalStorageService } from '../storage';

export interface ILocalizationServiceConfig<TLocale, TLocalizedValues> {
  defaultLocale: TLocale;
  onImportLocale: (
    locale: TLocale
  ) => Promise<{ localizedValues: TLocalizedValues }>;
}

export abstract class ILocalizationService<TLocale, TLocalizedValues> {
  abstract get locale(): TLocale;
  abstract get values(): TLocalizedValues;
  abstract get config(): ILocalizationServiceConfig<TLocale, TLocalizedValues>;
  abstract get isLocaleChanging$(): Observable<boolean>;
  abstract changeLocale(locale: TLocale): Promise<void>;
}

const LOCALE_SETTING_KEY = 'atl-locale';

export abstract class LocalizationServiceBase<TLocale, TLocalizedValues>
  implements ILocalizationService<TLocale, TLocalizedValues> {
  get locale() {
    return this._locale;
  }

  get values() {
    return this._values;
  }

  get config() {
    return this._config;
  }

  get isLocaleChanging$() {
    return this._isLocaleChanging$.asObservable();
  }

  constructor(
    protected localStorageService: ILocalStorageService,
    private _config: ILocalizationServiceConfig<TLocale, TLocalizedValues>
  ) {
    this.restoreLocaleSetting();
  }

  async changeLocale(locale: TLocale) {
    if (this.locale === locale) {
      return;
    }

    await this.setLocale(locale);
  }

  private _locale: TLocale;
  private _values: TLocalizedValues;
  private _isLocaleChanging$ = new Subject<boolean>();

  private async setLocale(locale: TLocale) {
    try {
      this._isLocaleChanging$.next(true);
      const m = await this.config.onImportLocale(locale);
      this._locale = locale;
      this._values = m.localizedValues as TLocalizedValues;
      this.localStorageService.setItem(LOCALE_SETTING_KEY, locale.toString());
    } catch (e) {
      throw new Error(`Locale ${locale} not supported.`);
    } finally {
      this._isLocaleChanging$.next(false);
    }
  }

  private async setDefaultLocale() {
    await this.setLocale(this.config.defaultLocale);
  }

  private async restoreLocaleSetting() {
    const localeSetting = this.localStorageService.getItem(LOCALE_SETTING_KEY);

    if (localeSetting) {
      await this.setLocale((localeSetting as unknown) as TLocale);
    } else {
      await this.setDefaultLocale();
    }
  }
}
