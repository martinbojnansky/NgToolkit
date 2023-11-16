import { InjectionToken, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslationServiceBase } from './translation.service';

export const TRANSLATION_SERVICE = new InjectionToken<
  TranslationServiceBase<any, any>
>('TranslationService');

export function translationGuard<
  TService extends TranslationServiceBase<any, any>
>(requiredModules: (keyof TService['modules'])[]): CanActivateFn {
  return () => {
    const translationService = inject(TRANSLATION_SERVICE);
    if (requiredModules) {
      return forkJoin(
        requiredModules.map((module) => translationService.load(module))
      ).pipe(map(() => true));
    } else {
      return true;
    }
  };
}
