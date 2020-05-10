import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IFormDraftService } from './form-draft.service';

@Injectable()
export class FormDraftGuard implements CanDeactivate<any> {
  constructor(protected formDraftService: IFormDraftService) {}

  public canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.formDraftService.hasAnyDraft && !this.isIgnoring) {
      return false;
    }

    this.isIgnoring = false;
    return true;
  }

  public ignoreOnce(): void {
    this.isIgnoring = true;
  }

  protected isIgnoring = false;
}
