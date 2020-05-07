import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

export const createAutofocusEvent = (element: any): CustomEvent => {
  return new CustomEvent('autofocus', { detail: element });
};

@Directive({
  selector: '[atlAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  @Input()
  atlAutofocus: string;

  constructor(protected elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.focus();
  }

  protected get selector() {
    return this.atlAutofocus
      ? this.atlAutofocus
      : 'button, [href], input, select, textarea, *[tabindex]:not([tabindex="-1"])';
  }

  protected focus() {
    const element = this.elementRef.nativeElement.querySelector(this.selector);
    element?.focus();
    document?.dispatchEvent(createAutofocusEvent(element));
  }
}
