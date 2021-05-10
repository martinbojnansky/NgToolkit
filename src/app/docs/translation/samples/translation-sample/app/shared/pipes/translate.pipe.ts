import { Pipe, PipeTransform } from '@angular/core';
import { TranslationPipeBase } from 'dist/ng-toolkit-lib';
import { TranslationLang, TranslationModules } from '../../../translations/config';
import { TranslationService } from '../../core/services/translation.service';

@Pipe({
  name: 'translate',
  pure: true,
})
export class TranslatePipe
  extends TranslationPipeBase<TranslationLang, TranslationModules>
  implements PipeTransform {
  constructor(protected translationService: TranslationService) {
    super(translationService);
  }
}
