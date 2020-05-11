// import { TestBed } from '@angular/core/testing';
// import { IFormDraftService, ILocalStorageService } from '@app/core/services';
// import { configureCoreTestingModule } from '@app/core/test-doubles/modules';
// import { localStorageServiceSpyFactory } from '@app/core/test-doubles/spies';
// import { LocalStorageKey, toastErrorSettings } from '@resources/constants';
// import { Locale, locales, LocalizationSettings } from '@resources/localization';
// import { MessageService } from 'primeng/api';
// import { ILocalizationService } from './localization.service';

// describe('ILocalizationService', () => {
//   let service: ILocalizationService;
//   let localStorageService: ILocalStorageService;
//   let localizationSettings: LocalizationSettings;

//   beforeEach(() => {
//     configureCoreTestingModule();

//     service = TestBed.inject(ILocalizationService);
//     localStorageService = TestBed.inject(ILocalStorageService);
//     localizationSettings = TestBed.inject(LocalizationSettings);

//     expect(localStorageService.getItem(LocalStorageKey.LOCALE)).toBe(localizationSettings.defaultLocale);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should return default locale when no locale is saved in local storage', () => {
//     expect(service.locale).toBe(localizationSettings.defaultLocale);
//   });

//   it('should return default locale values when no locale is saved in local storage', () => {
//     expect(service.values).toEqual(locales[localizationSettings.defaultLocale]);
//   });

//   it('should emit observable value when locale is changing', () => {
//     let expectedValue = false;
//     let counter = 0;
//     service.isLocaleChanging$.subscribe(value => {
//       expectedValue = !expectedValue;
//       expect(value).toBe(expectedValue);
//       counter++;
//     });
//     let testedLocale = Locale.EN;
//     service.changeLocale(testedLocale);
//     testedLocale = Locale.DE;
//     service.changeLocale(testedLocale);
//     expect(counter).toBe(4);
//   });

//   it('should throw toast error when there is a draft', () => {
//     const formDraftService: IFormDraftService = TestBed.inject(IFormDraftService);
//     const messageService: MessageService = TestBed.inject(MessageService);
//     const addMessageSpy = spyOn(messageService, 'add');
//     spyOnProperty(formDraftService, 'hasAnyDraft', 'get').and.returnValue(true);
//     const testedLocale = Locale.EN;
//     service.changeLocale(testedLocale);
//     expect(addMessageSpy).toHaveBeenCalledTimes(1);
//     expect(addMessageSpy).toHaveBeenCalledWith({
//       ...toastErrorSettings,
//       summary: service.values.shared.appErrors.unsavedChangesErrorTitle,
//       detail: service.values.shared.appErrors.unsavedChangesErrorDescription
//     });
//   });

//   it('should not throw toast error when there is no draft', () => {
//     const formDraftService: IFormDraftService = TestBed.inject(IFormDraftService);
//     const messageService: MessageService = TestBed.inject(MessageService);
//     const addMessageSpy = spyOn(messageService, 'add');
//     spyOnProperty(formDraftService, 'hasAnyDraft', 'get').and.returnValue(false);
//     const testedLocale = Locale.EN;
//     service.changeLocale(testedLocale);
//     expect(addMessageSpy).toHaveBeenCalledTimes(0);
//   });
// });

// describe('ILocalizationService with saved locale', () => {
//   const testedLocale = Locale.EN;
//   let service: ILocalizationService;
//   let localizationSettings: LocalizationSettings;

//   beforeEach(() => {
//     configureCoreTestingModule().overrideProvider(ILocalStorageService, {
//       useFactory: (): ILocalStorageService =>
//         localStorageServiceSpyFactory({
//           [LocalStorageKey.LOCALE]: testedLocale
//         })
//     });

//     service = TestBed.inject(ILocalizationService);
//     localizationSettings = TestBed.inject(LocalizationSettings);
//   });

//   it('should have test saved locale for different locale than default', () => {
//     expect(testedLocale).not.toBe(localizationSettings.defaultLocale);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should return saved locale when locale is saved in local storage', () => {
//     expect(service.locale).toBe(testedLocale);
//   });

//   it('should return locale values of saved locale when locale is saved in local storage', () => {
//     expect(service.values).toEqual(locales[testedLocale]);
//   });
// });
