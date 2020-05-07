import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

export const createAutofocusEvent = (element: any): CustomEvent => {
  return new CustomEvent('autofocus', { detail: element });
};

@Directive({
  selector: '[atlAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  @Input()
  public atlAutofocus: string;

  constructor(protected elementRef: ElementRef) {}

  public ngAfterViewInit(): void {
    this.focus();
  }

  protected get selector(): string {
    return this.atlAutofocus
      ? this.atlAutofocus
      : 'button, [href], input, select, textarea, *[tabindex]:not([tabindex="-1"])';
  }

  protected focus(): void {
    const element = this.elementRef.nativeElement.querySelector(this.selector);
    element?.focus();
    document?.dispatchEvent(createAutofocusEvent(element));
  }
}
