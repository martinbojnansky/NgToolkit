import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { nameof } from '../helpers';

@Directive({
  selector: '[ntlEnabled]',
})
export class EnabledDirective implements OnInit, OnChanges {
  @Input()
  formControl: FormControl;

  @Input()
  formGroup: FormGroup;

  @Input()
  formArray: FormArray;

  @Input()
  ntlEnabled: boolean;

  protected get control(): AbstractControl {
    return this.formControl || this.formGroup || this.formArray;
  }

  ngOnInit(): void {
    this.enable(this.ntlEnabled);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const enabledChange = changes[nameof<EnabledDirective>('ntlEnabled')];
    if (enabledChange) {
      this.enable(enabledChange.currentValue);
    }
  }

  protected enable(enable: boolean) {
    if (!this.control) {
      return;
    }

    enable ? this.control.enable() : this.control.disable();
  }
}
