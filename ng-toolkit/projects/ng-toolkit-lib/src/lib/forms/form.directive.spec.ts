import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  initialState,
  newState,
  TestState,
  TestStore,
} from '../store/observable-store.spec';
import { FormDirective } from './form.directive';

@Component({
  template: `
    <form
      atlForm
      [formGroup]="formGroup"
      [formState]="formState"
      [isEditEnabled]="isEditEnabled"
    >
      <label>
        <span>First Name:</span>
        <input type="text" formControlName="firstName" />
      </label>
      <label>
        <span>Last name:</span>
        <input type="text" formControlName="lastName" />
      </label>
    </form>
  `,
})
export class FormTestComponent {
  @Input()
  public formGroup: FormGroup;

  @Input()
  public formState: any;

  @Input()
  public isEditEnabled = true;

  constructor() {}
}

describe('FormDirective', () => {
  let component: FormTestComponent;
  let fixture: ComponentFixture<FormTestComponent>;
  let compiled: any;

  let store: TestStore;
  let formBuilder: FormBuilder;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule, ReactiveFormsModule],
        declarations: [FormTestComponent, FormDirective],
        providers: [TestStore, FormBuilder],
      }).compileComponents();

      store = TestBed.inject(TestStore);
      formBuilder = TestBed.inject(FormBuilder);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTestComponent);
    component = fixture.componentInstance;
    component.formGroup = formBuilder.group({
      firstName: [],
      lastName: [],
    });
    component.formState = { ...initialState };
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  async function fakeUserInput(state: Partial<TestState>): Promise<void> {
    const firstNameInput = compiled.querySelector(
      'input[formcontrolname="firstName"]'
    );
    firstNameInput.value = state.firstName;
    firstNameInput.dispatchEvent(new Event('input'));
    const lastNameInput = compiled.querySelector(
      'input[formcontrolname="lastName"]'
    );
    lastNameInput.value = state.lastName;
    lastNameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.formGroup.value.firstName).toBe(state.firstName);
    expect(component.formGroup.value.lastName).toBe(state.lastName);
  }

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should patch value with initial state', () => {
    expect(component.formGroup.value.firstName).toBe(initialState.firstName);
    expect(component.formGroup.value.lastName).toBe(initialState.lastName);
  });

  it('should patch value with new state', () => {
    component.formState = { ...newState };
    fixture.detectChanges();
    expect(component.formGroup.value.firstName).toBe(newState.firstName);
    expect(component.formGroup.value.lastName).toBe(newState.lastName);
  });

  it('should not mutate state', async () => {
    await fakeUserInput(newState);
    fixture.detectChanges();
    expect(component.formGroup.value.firstName).toBe(newState.firstName);
    expect(component.formState.firstName).toBe(initialState.firstName);
    expect(component.formGroup.value.lastName).toBe(newState.lastName);
    expect(component.formState.lastName).toBe(initialState.lastName);
  });

  it('should reset state when patching', () => {
    component.formState = {};
    fixture.detectChanges();
    expect(component.formGroup.value.firstName).toBeFalsy();
    expect(component.formGroup.value.lastName).toBeFalsy();
    expect(component.formGroup.value.address).toBeFalsy();
  });

  it('should enable controls when patching', () => {
    component.isEditEnabled = true;
    component.formState = { ...newState };
    fixture.detectChanges();
    expect(component.formGroup.enabled).toBeTruthy();
    for (const key of Object.keys(component.formGroup.controls)) {
      expect(component.formGroup.controls[key].enabled).toBeTruthy();
    }
  });

  it('should disable controls when patching', () => {
    component.isEditEnabled = false;
    component.formState = { ...newState };
    fixture.detectChanges();
    expect(component.formGroup.enabled).toBeFalsy();
    for (const key of Object.keys(component.formGroup.controls)) {
      expect(component.formGroup.controls[key].enabled).toBeFalsy();
    }
  });

  it('should not enable when already enabled', () => {
    expect(component.isEditEnabled).toBeTruthy();
    const enableSpy = spyOn(component.formGroup, 'enable');
    component.isEditEnabled = true;
    fixture.detectChanges();
    expect(enableSpy).not.toHaveBeenCalled();
  });

  it('should not emit value change event when enabling', () => {
    component.isEditEnabled = false;
    fixture.detectChanges();
    const enableSpy = spyOn(component.formGroup, 'enable');
    component.isEditEnabled = true;
    fixture.detectChanges();
    expect(enableSpy).toHaveBeenCalledWith({ emitEvent: false });
  });

  it('should not emit value change event when disabling', () => {
    const disableSpy = spyOn(component.formGroup, 'disable');
    component.isEditEnabled = false;
    fixture.detectChanges();
    expect(disableSpy).toHaveBeenCalledWith({ emitEvent: false });
  });
});
