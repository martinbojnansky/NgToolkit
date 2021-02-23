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
  selector: '[ngtForm]',
})
export class FormDirective implements OnInit, OnChanges {
  @Input()
  formGroup: FormGroup;

  @Input()
  formState: any;

  @Input()
  editEnabled: boolean;

  constructor() {}

  ngOnInit() {
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

  ngOnChanges(changes: SimpleChanges) {
    const formStateChange = changes[nameof<FormDirective>('formState')];

    if (formStateChange) {
      this.applyFormState(formStateChange.currentValue);
    } else if (changes[nameof<FormDirective>('editEnabled')]) {
      this.updateFormEnabled();
    }
  }

  discardChanges() {
    this.applyFormState({ ...this.formState });
  }

  applyFormState(state: any) {
    this.formGroup.reset();
    this.formGroup.patchValue(state || {});
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
    this.updateFormEnabled();
  }

  protected updateFormEnabled(options?: {
    emitEvent?: boolean;
    onlySelf?: boolean;
  }) {
    const opts = { emitEvent: false, ...options };
    this.editEnabled
      ? this.formGroup.enable(opts)
      : this.formGroup.disable(opts);
  }
}
