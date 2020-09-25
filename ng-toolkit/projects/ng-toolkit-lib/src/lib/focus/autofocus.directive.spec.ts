import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AutofocusDirective,
  createAutofocusEvent,
} from './autofocus.directive';

@Component({
  template: `
    <section [atlAutofocus]="selector">
      <a tabindex="0">a</a>
      <input class=".autofocus" value="b" />
    </section>
  `,
})
export class AutofocusTestComponent {
  @Input()
  public selector: string;
}

describe('AutofocusDirective', () => {
  let component: AutofocusTestComponent;
  let fixture: ComponentFixture<AutofocusTestComponent>;
  let compiled: any;
  let dispatchEventSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutofocusTestComponent, AutofocusDirective],
    }).compileComponents();
  }));

  function createTestElement(selector?: string): void {
    dispatchEventSpy = spyOn(document, 'dispatchEvent').and.callThrough();
    fixture = TestBed.createComponent(AutofocusTestComponent);
    component = fixture.componentInstance;
    component.selector = selector;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  }

  it('should autofocus with default selector', () => {
    createTestElement();
    const autoFocusedElement = compiled.querySelector('a');
    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      createAutofocusEvent(autoFocusedElement)
    );
    expect(document.activeElement).toBe(autoFocusedElement);
  });

  it('should autofocus with custom selector', () => {
    createTestElement('input');
    const autoFocusedElement = compiled.querySelector('input');
    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      createAutofocusEvent(autoFocusedElement)
    );
    expect(document.activeElement).toBe(autoFocusedElement);
  });
});
