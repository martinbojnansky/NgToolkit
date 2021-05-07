import {
  TranslationLang,
  TranslationModules
} from './../config';

export const translated: TranslationModules['translated'] = {
  welcomeMessage: 'Willkommen bei NgToolkit Demo',
  welcomeMessageParametrized: (name) => `Hallo, ${name}!`,
  welcomeMessageCombined(this: TranslationModules['translated'], name) {
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
