import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export abstract class ControlValueComponent<T> implements ControlValueAccessor {
  get value(): T {
    return this._value;
  }

  get disabled() {
    return this._disabled;
  }

  writeValue(value: T) {
    if (this._value !== value) {
      this._value = value;
      this.onChange(value);
    }

    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: T) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (this._disabled !== isDisabled) {
      this._disabled = isDisabled;
    }

    this.changeDetectorRef.markForCheck();
  }

  // tslint:disable: variable-name
  protected _value: T;
  protected _disabled: boolean;
  // tslint:enable: variable-name

  protected constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  protected onChange: (value: T) => void = () => {};
  protected onTouched: () => void = () => {};
}
