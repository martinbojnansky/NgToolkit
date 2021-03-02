import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { trySafe } from '../helpers';
import { TranslationService } from './translation.service';

@Injectable()
export class TranslationGuard implements CanActivate, CanActivateChild {
  static withModule<TModules>(module: keyof TModules) {
    return { translationModule: module };
  }

  constructor(protected translationService: TranslationService<any, any>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.translationLoaded(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.translationLoaded(childRoute);
  }

  private translationLoaded(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | true {
    const translationModule = trySafe(() => route.data.translationModule);
    if (translationModule) {
      return this.translationService.load(translationModule);
    } else {
      return true;
    }
  }
}
