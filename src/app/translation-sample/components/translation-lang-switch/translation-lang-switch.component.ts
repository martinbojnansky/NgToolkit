import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  TranslationLang,
  TranslationService
} from 'src/app/translation.module';

@Component({
  selector: 'app-translation-lang-switch',
  templateUrl: './translation-lang-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationLangSwitchComponent implements OnInit {
  readonly langs = Object.keys(TranslationLang);
  readonly selectedLang = this.translateService.lang;

  constructor(protected translateService: TranslationService) { }

  ngOnInit(): void { }

  changeLang(lang: TranslationLang): void {
    this.translateService.changeLang(lang);
  }
}
