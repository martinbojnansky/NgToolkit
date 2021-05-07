import { TranslationLang, TranslationModules } from './../config';

export const translated: TranslationModules['translated'] = {
  welcomeMessage: 'Welcome to NgToolkit Demo',
  welcomeMessageParametrized: (name) => `Hello, ${name}!`,
  welcomeMessageCombined(this: TranslationModules['translated'], name) {
    return `${this.welcomeMessageParametrized(name)} ${this.welcomeMessage}`;
  },
  translationLangLabel: (lang: TranslationLang) => {
    switch (lang) {
      case 'en':
        return 'English';
      case 'de':
        return 'German';
      default:
        return lang;
    }
  },
};
