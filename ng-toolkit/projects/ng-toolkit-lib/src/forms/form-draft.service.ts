import { Injectable } from '@angular/core';

export abstract class IFormDraftService {
  public abstract get hasAnyDraft(): boolean;
}

@Injectable()
export class FormDraftService implements IFormDraftService {
  get hasAnyDraft(): boolean {
    return !!document.querySelector('form.ng-dirty');
  }
}
