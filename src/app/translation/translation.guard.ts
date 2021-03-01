import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TranslationService } from './translation.module';

@Injectable({
  providedIn: 'root',
})
export class TranslationGuard implements CanActivate {
  constructor(
    protected translationService: TranslationService,
    protected router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.translationService.load('storeSample');
  }
}
