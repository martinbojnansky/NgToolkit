import { PipeTransform } from '@angular/core';
import { TranslationServiceBase } from './translation.service';

export class TranslationPipeBase<TLang, TModules> implements PipeTransform {
  constructor(
    protected translationService: TranslationServiceBase<TLang, TModules>
  ) {}

  public transform(value: string, args?: any): Partial<TModules> {
    return this.translationService.modules;
  }
}
