import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { createAutofocusEvent } from './autofocus.directive';
import { FocusWithinDirective } from './focus-within.directive';

@Component({
  template: `
    <section>
      <h1>h1</h1>
      <button>button</button>
      <div atlFocusWithin (focusIn)="onFocusin()" (focusOut)="onFocusout()">
        <a tabindex="0">a</a>
        <span>span</span>
      </div>
    </section>
  `,
})
export class FocusWithinTestComponent {
  public onFocusin(): void {}
  public onFocusout(): void {}
}

describe('FocusWithinDirective', () => {
  let component: FocusWithinTestComponent;
  let fixture: ComponentFixture<FocusWithinTestComponent>;
  let compiled: any;
  let focusinSpy: jasmine.Spy;
  let focusoutSpy: jasmine.Spy;
  let focusWithinElement: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FocusWithinTestComponent, FocusWithinDirective],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusWithinTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    focusinSpy = spyOn(component, 'onFocusin');
    focusoutSpy = spyOn(component, 'onFocusout');
    focusWithinElement = compiled.querySelector('div');
  });

  it(
    'should call focusin on click inside',
    waitForAsync(() => {
      const a = compiled.querySelector('a');
      a.click();
      expect(focusinSpy).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should not call focusin on click outside',
    waitForAsync(() => {
      const h1 = compiled.querySelector('h1');
      h1.click();
      expect(focusinSpy).toHaveBeenCalledTimes(0);
    })
  );

  it(
    'should call focusout on click outside',
    waitForAsync(() => {
      const a = compiled.querySelector('a');
      const h1 = compiled.querySelector('h1');
      a.click();
      h1.click();
      expect(focusoutSpy).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should not call focusin or focusout on click inside focuswithin element',
    waitForAsync(() => {
      const a = compiled.querySelector('a');
      const span = compiled.querySelector('span');
      a.click();
      span.click();
      expect(focusinSpy).toHaveBeenCalledTimes(1);
      expect(focusoutSpy).toHaveBeenCalledTimes(0);
    })
  );

  it(
    'should add css class on click inside',
    waitForAsync(() => {
      const a = compiled.querySelector('a');
      a.click();
      fixture.detectChanges();
      expect(focusWithinElement.className).toContain('atl-state_focused');
    })
  );

  it(
    'should not add css class on click outside',
    waitForAsync(() => {
      const h1 = compiled.querySelector('h1');
      h1.click();
      fixture.detectChanges();
      expect(focusWithinElement.className).not.toContain('atl-state_focused');
    })
  );

  it(
    'should remove css class on click outside',
    waitForAsync(() => {
      const a = compiled.querySelector('a');
      const h1 = compiled.querySelector('h1');
      a.click();
      fixture.detectChanges();
      h1.click();
      fixture.detectChanges();
      expect(focusWithinElement.className).not.toContain('atl-state_focused');
    })
  );

  it(
    'should keep css class on click inside',
    waitForAsync(() => {
      const a = compiled.querySelector('a');
      const span = compiled.querySelector('span');
      a.click();
      fixture.detectChanges();
      span.click();
      fixture.detectChanges();
      expect(focusWithinElement.className).toContain('atl-state_focused');
    })
  );

  it(
    'should call focusin on autofocus',
    waitForAsync(() => {
      document.dispatchEvent(createAutofocusEvent(compiled.querySelector('a')));
      expect(focusinSpy).toHaveBeenCalledTimes(1);
    })
  );
});
