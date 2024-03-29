import { SimpleChange } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { EnabledDirective } from './enabled.directive';

describe('EnabledDirective', () => {
  let directive: EnabledDirective;

  beforeEach(() => {
    directive = new EnabledDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should change enabled of FormControl on init', () => {
    directive.formControl = new UntypedFormControl();
    expect(directive.formControl.enabled).toBeTruthy();
    directive.ngtlEnabled = false;
    directive.ngOnInit();
    expect(directive.formControl.enabled).toBeFalsy();
  });

  it('should change enabled of FormControl on change', () => {
    directive.formControl = new UntypedFormControl();
    expect(directive.formControl.enabled).toBeTruthy();
    directive.ngtlEnabled = false;
    directive.ngOnChanges({
      ngtlEnabled: { currentValue: false } as SimpleChange,
    });
    expect(directive.formControl.enabled).toBeFalsy();
  });

  it('should change enabled of FormGroup on init', () => {
    directive.formGroup = new UntypedFormGroup({});
    expect(directive.formGroup.enabled).toBeTruthy();
    directive.ngtlEnabled = false;
    directive.ngOnInit();
    expect(directive.formGroup.enabled).toBeFalsy();
  });

  it('should change enabled of FormGroup on change', () => {
    directive.formGroup = new UntypedFormGroup({});
    expect(directive.formGroup.enabled).toBeTruthy();
    directive.ngtlEnabled = false;
    directive.ngOnChanges({
      ngtlEnabled: { currentValue: false } as SimpleChange,
    });
    expect(directive.formGroup.enabled).toBeFalsy();
  });

  it('should change enabled of FormArray on init', () => {
    directive.formArray = new UntypedFormArray([]);
    expect(directive.formArray.enabled).toBeTruthy();
    directive.ngtlEnabled = false;
    directive.ngOnInit();
    expect(directive.formArray.enabled).toBeFalsy();
  });

  it('should change enabled of FormArray on change', () => {
    directive.formArray = new UntypedFormArray([]);
    expect(directive.formArray.enabled).toBeTruthy();
    directive.ngtlEnabled = false;
    directive.ngOnChanges({
      ngtlEnabled: { currentValue: false } as SimpleChange,
    });
    expect(directive.formArray.enabled).toBeFalsy();
  });
});
