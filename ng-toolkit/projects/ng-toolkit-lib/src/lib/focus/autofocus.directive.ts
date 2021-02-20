import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

export const createAutofocusEvent = (element: any): CustomEvent => {
  return new CustomEvent('autofocus', { detail: element });
};

@Directive({
  selector: '[ngtAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  @Input()
  ngtAutofocus: string;

  constructor(protected elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.focus();
  }

  protected get selector() {
    return this.ngtAutofocus
      ? this.ngtAutofocus
      : 'button, [href], input, select, textarea, *[tabindex]:not([tabindex="-1"])';
  }

  protected focus() {
    const element = this.elementRef.nativeElement.querySelector(this.selector);
    element?.focus();
    document?.dispatchEvent(createAutofocusEvent(element));
  }
}
