import { TranslationModules } from './../config';

export const translated: TranslationModules['translated'] = {
  welcomeMessage: 'Welcome to NgToolkit Demo',
  welcomeMessageParametrized: (name) => `Hello, ${name}!`,
  welcomeMessageCombined(this: TranslationModules['translated'], name) {
    return `${this.welcomeMessageParametrized(name)} ${this.welcomeMessage}`;
  },
  translationLangLabel: {
    en: 'English',
    de: 'German',
  },
};
