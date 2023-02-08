export enum TranslationLang {
  en = 'en',
  de = 'de',
}

export interface TranslationModules {
  translated: {
    welcomeMessage: string;
    welcomeMessageParametrized: (name: string) => string;
    translationLangLabel: { [lang in TranslationLang]: string };
    multiline: string;
    bool: boolean;
  };
}
