import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  TranslationLang,
  TranslationService,
} from 'src/app/translation.module';

@Component({
  selector: 'app-translation-lang-switch',
  templateUrl: './translation-lang-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationLangSwitchComponent implements OnInit {
  readonly langOptions: { value: TranslationLang; label: string }[] = [
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'de',
      label: 'Deutsch',
    },
  ];

  readonly selectedLangOption = this.langOptions.find(
    (lo) => lo.value === this.translateService.lang
  );

  constructor(protected translateService: TranslationService) {}

  ngOnInit(): void {}

  changeLang = (lang: TranslationLang) =>
    this.translateService.changeLang(lang);
}
