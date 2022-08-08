import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { nameof, Nullable } from '../helpers';

@Directive({
  selector: '[ngtlEnabled]',
})
export class EnabledDirective implements OnInit, OnChanges {
  @Input()
  formControl: UntypedFormControl;

  @Input()
  formGroup: UntypedFormGroup;

  @Input()
  formArray: UntypedFormArray;

  @Input()
  ngtlEnabled: Nullable<boolean>;

  protected get control(): AbstractControl {
    return this.formControl || this.formGroup || this.formArray;
  }

  ngOnInit(): void {
    this.enable(this.ngtlEnabled || false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const enabledChange = changes[nameof<EnabledDirective>('ngtlEnabled')];
    if (enabledChange) {
      this.enable(enabledChange.currentValue);
    }
  }

  protected enable(enable: boolean) {
    if (!this.control) {
      return;
    }

    if (enable) {
      this.control.enable();
    } else {
      this.control.disable();
    }
  }
}
