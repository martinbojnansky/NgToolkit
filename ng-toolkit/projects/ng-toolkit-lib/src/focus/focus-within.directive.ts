import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[atlFocusWithin]',
})
export class FocusWithinDirective {
  @Output()
  public focusIn = new EventEmitter();

  @Output()
  public focusOut = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  @HostBinding('class.atl-state_focused')
  protected hasFocus: boolean;

  @HostListener('document:click', ['$event'])
  protected onClick(e: Event): void {
    this.onDocumentEvent(e);
  }

  @HostListener('document:keyup', ['$event'])
  protected onKeyup(e: Event): void {
    this.onDocumentEvent(e);
  }

  @HostListener('window:focus', ['$event'])
  protected onWindowFocus(e: Event): void {
    this.onDocumentEvent(e);
  }

  @HostListener('window:blur', ['$event'])
  protected onWindowBlur(e: Event): void {
    this.onDocumentEvent(e);
  }

  @HostListener('document:autofocus', ['$event'])
  protected onAutofocus(e: CustomEvent): void {
    this.onDocumentEvent({ target: e.detail } as Event);
  }

  protected onDocumentEvent(e: Event): void {
    let target: Node | Element;
    if (e.target instanceof Node) {
      target = e.target;
    } else {
      target = document.activeElement;
    }

    const hasFocus = this.elementRef.nativeElement.contains(target);
    if (this.hasFocus === hasFocus) {
      return;
    }

    this.hasFocus = hasFocus;
    hasFocus ? this.focusIn.emit(e) : this.focusOut.emit(e);
  }
}
