import { TranslationModules } from './../config';

export const translated: TranslationModules['translated'] = {
  welcomeMessage: 'Willkommen bei NgToolkit Demo',
  welcomeMessageParametrized: (name) => `Hallo, ${name}!`,
  welcomeMessageCombined(this: TranslationModules['translated'], name) {
    return `${this.welcomeMessageParametrized(name)} ${this.welcomeMessage}`;
  },
  translationLangLabel: {
    en: 'Englisch',
    de: 'Deutsch',
  },
};
