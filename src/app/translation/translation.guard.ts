import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';
import { TranslationService } from './translation.module';

@Injectable({
  providedIn: 'root',
})
export class TranslationGuard implements CanActivate {
  constructor(protected translationService: TranslationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(this.translationService.values);
    const x = this.translationService.isLangChanging$.pipe(
      skipWhile((v) => this.translationService.values === undefined),
      map(() => true)
    );
    return x;
  }
}
