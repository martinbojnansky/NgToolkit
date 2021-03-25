import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { trySafe } from '../helpers';
import { TranslationServiceBase } from './translation.service';

@Injectable()
export class TranslationGuard implements CanActivate, CanActivateChild {
  constructor(protected translationService: TranslationServiceBase<any, any>) {}

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
    const translationModules = trySafe(
      () => route.data.translationModules as string[]
    );
    if (translationModules) {
      return forkJoin(
        translationModules.map((module) => this.translationService.load(module))
      ).pipe(map(() => true));
    } else {
      return true;
    }
  }
}
