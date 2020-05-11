import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DebugElement,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueComponentBase } from './control-value.component';

@Component({
  template: `
    <input
      type="text"
      [ngModel]="value"
      (ngModelChange)="writeValue($event)"
      (blur)="onTouched()"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ControlValueTestComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlValueTestComponent extends ControlValueComponentBase<
  string
> {
  constructor(protected changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }
}

describe('ControlValueComponent', () => {
  let component: ControlValueTestComponent;
  let fixture: ComponentFixture<ControlValueTestComponent>;
  let compiled: DebugElement;

  let input: DebugElement;
  let onChangeSpy: jasmine.Spy;
  let onTouchedSpy: jasmine.Spy;

  const value = 'John Doe';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ControlValueTestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlValueTestComponent);
    component = fixture.componentInstance;
    registerEvents();
    fixture.detectChanges();

    compiled = fixture.debugElement;
    input = compiled.query((e) => e.name === 'input');
  });

  function registerEvents(): void {
    onChangeSpy = jasmine.createSpy();
    component.registerOnChange(onChangeSpy);
    onTouchedSpy = jasmine.createSpy();
    component.registerOnTouched(onTouchedSpy);
  }

  function writeValue(): void {
    component.writeValue(value);
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('registers on change', () => {
    (component as any).onChange(value);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenCalledWith(value);
  });

  it('registers on touched', () => {
    (component as any).onTouched();
    expect(onTouchedSpy).toHaveBeenCalledTimes(1);
  });

  it('should write value', () => {
    writeValue();
    expect(component.value).toBe(value);
  });

  it('should call on change', () => {
    component.writeValue(value);
    fixture.detectChanges();
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenCalledWith(value);
  });

  it('should ask for change detection', () => {
    const markForCheckSpy = spyOn<ChangeDetectorRef>(
      (component as any).changeDetectorRef,
      'markForCheck'
    );
    writeValue();
    expect(markForCheckSpy).toHaveBeenCalledTimes(1);
  });
});
