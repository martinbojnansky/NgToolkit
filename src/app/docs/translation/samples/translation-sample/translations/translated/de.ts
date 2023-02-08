import { TranslationModules } from './../config';

export const translated: TranslationModules['translated'] = {
  welcomeMessage: 'Willkommen bei NgToolkit Demo',
  welcomeMessageParametrized: (name) => `Hallo, ${name}!`,
  translationLangLabel: {
    en: 'Englisch',
    de: 'Deutsch',
  },
  multiline: `1
  2
  3`,
  bool: false,
};
