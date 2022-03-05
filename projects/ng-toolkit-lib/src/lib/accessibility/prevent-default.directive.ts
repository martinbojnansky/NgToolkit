import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ngtlPreventDefault]',
})
export class PreventDefaultDirective {
  @Input()
  ngtlPreventDefault: string[];

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (this.ngtlPreventDefault.includes(e?.code)) {
      e.preventDefault();
    }
  }
}
