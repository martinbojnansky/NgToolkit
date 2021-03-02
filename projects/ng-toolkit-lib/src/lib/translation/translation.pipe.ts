import { PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';

export class TranslationPipe<TModules> implements PipeTransform {
  constructor(
    protected translationService: TranslationService<any, TModules>
  ) {}

  public transform(value: string, args?: any): Partial<TModules> {
    return this.translationService.modules;
  }
}
