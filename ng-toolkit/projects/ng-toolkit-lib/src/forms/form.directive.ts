import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { nameof } from '../helpers';

@Directive({
  selector: '[atlForm]',
})
export class FormDirective implements OnInit, OnChanges {
  @Input()
  public formGroup: FormGroup;

  @Input()
  public formState: any;

  @Input()
  public isEditEnabled: boolean;

  constructor() {}

  public ngOnInit(): void {
    if (this.formState) {
      this.ngOnChanges({
        [nameof<FormDirective>('formState')]: new SimpleChange(
          undefined,
          this.formState,
          false
        ),
      });
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const formStateChange = changes[nameof<FormDirective>('formState')];
    if (!formStateChange && changes[nameof<FormDirective>('isEditEnabled')]) {
      this.updateFormEnabled();
    }

    if (!formStateChange) {
      return;
    }

    if (formStateChange.currentValue) {
      this.applyFormState(formStateChange.currentValue);
    }
  }

  public discardChanges(): void {
    this.applyFormState({ ...this.formState });
  }

  protected applyFormState(state: any): void {
    this.formGroup.reset(); // TODO: Allow reset with initial state
    this.formGroup.patchValue(state);
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
    this.updateFormEnabled();
  }

  protected updateFormEnabled(options?: {
    emitEvent?: boolean;
    onlySelf?: boolean;
  }): void {
    const opts = { emitEvent: false, ...options };
    this.isEditEnabled
      ? this.formGroup.enable(opts)
      : this.formGroup.disable(opts);
  }
}
