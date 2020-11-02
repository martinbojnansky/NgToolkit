import { Injectable } from '@angular/core';

export abstract class FormDraftService {
  public abstract get hasAnyDraft(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FormDraftServiceImpl implements FormDraftService {
  get hasAnyDraft() {
    return !!document.querySelector('form.ng-dirty');
  }
}
