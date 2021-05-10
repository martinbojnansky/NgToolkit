import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationLang } from '../../../../translations/config';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-translation-sample',
  templateUrl: './translation-sample.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationSampleComponent implements OnInit {
  get welcomeMessage() {
    return this.translationService.modules.translated.welcomeMessage;
  }

  readonly langs = TranslationLang;

  constructor(protected translationService: TranslationService) { }

  ngOnInit(): void { }
}
