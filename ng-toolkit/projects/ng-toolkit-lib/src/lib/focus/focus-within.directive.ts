import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[ngtFocusWithin]',
})
export class FocusWithinDirective {
  @Output()
  focusIn = new EventEmitter();

  @Output()
  focusOut = new EventEmitter();

  constructor(protected elementRef: ElementRef) {}

  @HostBinding('class.ngt-state_focused')
  protected focused: boolean;

  @HostListener('document:click', ['$event'])
  protected onClick(e: Event) {
    this.onDocumentEvent(e);
  }

  @HostListener('document:keyup', ['$event'])
  protected onKeyup(e: Event) {
    this.onDocumentEvent(e);
  }

  @HostListener('window:focus', ['$event'])
  protected onWindowFocus(e: Event) {
    this.onDocumentEvent(e);
  }

  @HostListener('window:blur', ['$event'])
  protected onWindowBlur(e: Event) {
    this.onDocumentEvent(e);
  }

  @HostListener('document:autofocus', ['$event'])
  protected onAutofocus(e: CustomEvent) {
    this.onDocumentEvent({ target: e.detail } as Event);
  }

  protected onDocumentEvent(e: Event) {
    let target: Node | Element;
    if (e.target instanceof Node) {
      target = e.target;
    } else {
      target = document.activeElement;
    }

    const focused = this.elementRef.nativeElement.contains(target);
    if (this.focused === focused) {
      return;
    }

    this.focused = focused;
    focused ? this.focusIn.emit(e) : this.focusOut.emit(e);
  }
}
