import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { FormDraftService } from './form-draft.service';

@Injectable()
export class FormDraftGuard implements CanDeactivate<any> {
  constructor(protected formDraftService: FormDraftService) {}

  public canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ) {
    if (this.formDraftService.anyDraft && !this.ignoring) {
      return false;
    }

    this.ignoring = false;
    return true;
  }

  public ignoreOnce(): void {
    this.ignoring = true;
  }

  protected ignoring = false;
}
