import { Injectable } from '@angular/core';

export abstract class FormDraftService {
  public abstract get anyDraft(): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FormDraftServiceImpl implements FormDraftService {
  get anyDraft() {
    return !!document.querySelector('form.ng-dirty');
  }
}
