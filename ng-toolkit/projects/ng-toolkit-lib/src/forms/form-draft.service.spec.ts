import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormDraftService, IFormDraftService } from './form-draft.service';

@Component({
  template: `
    <form [formGroup]="formGroup">
      <input type="text" formControlName="lastName" />,
      <input type="text" formControlName="firstName" />
    </form>
  `,
})
export class FormDraftServiceTestComponent {
  @Input()
  public formGroup: FormGroup;

  constructor() {}
}

describe('IFormDraftService', () => {
  let component: FormDraftServiceTestComponent;
  let fixture: ComponentFixture<FormDraftServiceTestComponent>;
  let compiled: any;
  let service: IFormDraftService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [FormDraftServiceTestComponent],
      providers: [
        FormBuilder,
        {
          provide: IFormDraftService,
          useClass: FormDraftService,
        },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDraftServiceTestComponent);
    component = fixture.componentInstance;
    component.formGroup = TestBed.inject(FormBuilder).group({
      firstName: [],
      lastName: [],
    });
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    service = TestBed.inject(IFormDraftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when form is pristine', () => {
    expect(component.formGroup.pristine).toBeTruthy();
    expect(service.hasAnyDraft).toBeFalsy();
  });

  it('should return true when form is dirty', async () => {
    const firstNameInput = compiled.querySelector(
      'input[formcontrolname="firstName"]'
    );
    firstNameInput.value = 'John';
    firstNameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.formGroup.dirty).toBeTruthy();
    expect(service.hasAnyDraft).toBeTruthy();
  });
});
