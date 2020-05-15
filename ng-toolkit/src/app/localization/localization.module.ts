import { Injectable, NgModule } from '@angular/core';
import { ILocalStorageService, LocalizationServiceBase, ILocalizationServiceConfig } from 'ng-toolkit-lib';

export type Locale = 'en' | 'de';

export interface LocalizedValues {
  welcomeMessage: string;
}

export class LocalizationServiceConfig implements ILocalizationServiceConfig<Locale, LocalizedValues> {
  readonly defaultLocale: 'en';
  readonly onImportLocale = (locale: Locale) => import(`src/app/localization/${locale}.locale`);
}

@Injectable()
export class LocalizationService extends LocalizationServiceBase<
  Locale,
  LocalizedValues
> {
  constructor(protected localStorageService: ILocalStorageService, protected localizationServiceConfig: LocalizationServiceConfig) {
    super(localStorageService, localizationServiceConfig);
  }
}

@NgModule({
  providers: [
    LocalizationService,
    LocalizationServiceConfig,
    {
      provide: ILocalStorageService,
      useValue: localStorage,
    }
  ],
})
export class LocalizationModule {}
