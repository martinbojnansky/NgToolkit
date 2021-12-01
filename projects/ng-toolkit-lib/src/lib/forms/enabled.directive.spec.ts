import { SimpleChange } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
    directive.formControl = new FormControl();
    expect(directive.formControl.enabled).toBeTruthy();
    directive.ntlEnabled = false;
    directive.ngOnInit();
    expect(directive.formControl.enabled).toBeFalsy();
  });

  it('should change enabled of FormControl on change', () => {
    directive.formControl = new FormControl();
    expect(directive.formControl.enabled).toBeTruthy();
    directive.ntlEnabled = false;
    directive.ngOnChanges({
      ntlEnabled: { currentValue: false } as SimpleChange,
    });
    expect(directive.formControl.enabled).toBeFalsy();
  });

  it('should change enabled of FormGroup on init', () => {
    directive.formGroup = new FormGroup({});
    expect(directive.formGroup.enabled).toBeTruthy();
    directive.ntlEnabled = false;
    directive.ngOnInit();
    expect(directive.formGroup.enabled).toBeFalsy();
  });

  it('should change enabled of FormGroup on change', () => {
    directive.formGroup = new FormGroup({});
    expect(directive.formGroup.enabled).toBeTruthy();
    directive.ntlEnabled = false;
    directive.ngOnChanges({
      ntlEnabled: { currentValue: false } as SimpleChange,
    });
    expect(directive.formGroup.enabled).toBeFalsy();
  });

  it('should change enabled of FormArray on init', () => {
    directive.formArray = new FormArray([]);
    expect(directive.formArray.enabled).toBeTruthy();
    directive.ntlEnabled = false;
    directive.ngOnInit();
    expect(directive.formArray.enabled).toBeFalsy();
  });

  it('should change enabled of FormArray on change', () => {
    directive.formArray = new FormArray([]);
    expect(directive.formArray.enabled).toBeTruthy();
    directive.ntlEnabled = false;
    directive.ngOnChanges({
      ntlEnabled: { currentValue: false } as SimpleChange,
    });
    expect(directive.formArray.enabled).toBeFalsy();
  });
});
