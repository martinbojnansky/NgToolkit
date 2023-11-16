import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationLang } from '../../../../translations/config';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-translation-lang-switch',
  templateUrl: './translation-lang-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationLangSwitchComponent implements OnInit {
  readonly langs = Object.keys(TranslationLang);
  readonly selectedLang: TranslationLang;

  constructor(protected translateService: TranslationService) {
    this.selectedLang = this.translateService.lang;
  }

  ngOnInit(): void {}

  changeLang(lang: TranslationLang): void {
    this.translateService.changeLang(lang);
  }
}
