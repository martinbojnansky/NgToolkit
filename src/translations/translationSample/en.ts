import {
  TranslationLang,
  TranslationModules,
} from 'src/app/translation.module';

export const translationSample: TranslationModules['translationSample'] = {
  welcomeMessage: 'Welcome to NgToolkit Demo',
  welcomeMessageParametrized: (name) => `Hello, ${name}!`,
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
