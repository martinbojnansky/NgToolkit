import { Injectable, NgModule } from '@angular/core';
import { ILocalStorageService, LocalizationServiceBase } from 'ng-toolkit-lib';

export type Locale = 'en' | 'de';

export interface LocalizedValues {
  welcomeMessage: string;
}

@Injectable()
export class LocalizationService extends LocalizationServiceBase<
  Locale,
  LocalizedValues
> {
  constructor(protected localStorageService: ILocalStorageService) {
    super(localStorageService, {
      defaultLocale: 'en',
      onImportLocale: (locale) =>
        import(`src/app/localization/${locale}.locale`),
    });
  }
}

@NgModule({
  providers: [
    {
      provide: ILocalStorageService,
      useValue: localStorage,
    },
    LocalizationService,
  ],
})
export class LocalizationModule {}
