import {
  TranslationLang,
  TranslationModules,
} from 'src/app/translation.module';

export const translationSample: TranslationModules['translationSample'] = {
  welcomeMessage: 'Willkommen bei NgToolkit Demo',
  welcomeMessageParametrized: (name) => `Hallo, ${name}!`,
  welcomeMessageCombined(this: TranslationModules['translationSample'], name) {
    return `${this.welcomeMessageParametrized(name)} ${this.welcomeMessage}`;
  },
  translationLangLabel: (lang: TranslationLang) => {
    switch (lang) {
      case 'en':
        return 'Englisch';
      case 'de':
        return 'Deutsch';
      default:
        return lang;
    }
  },
};
