import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../translation/translation.module';

@Component({
  selector: 'app-translation-sample',
  template: `
    <p>
      Pipe Binding: {{ ('' | translate).translationSample?.welcomeMessage }}
    </p>
    <p>Service Binding: {{ welcomeMessage }}</p>
  `,
})
export class TranslationSampleComponent implements OnInit {
  get welcomeMessage(): string {
    return this.translateService.modules.translationSample.welcomeMessage;
  }

  constructor(protected translateService: TranslationService) {}

  ngOnInit(): void {}
}
