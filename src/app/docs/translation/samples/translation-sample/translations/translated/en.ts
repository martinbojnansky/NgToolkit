import { TranslationModules } from './../config';

export const translated: TranslationModules['translated'] = {
  welcomeMessage: 'Welcome to NgToolkit Demo',
  welcomeMessageParametrized: (name) => `Hello, ${name}!`,
  translationLangLabel: {
    en: 'English',
    de: 'German',
  },
};
