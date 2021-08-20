import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ntlPreventDefault]',
})
export class PreventDefaultDirective {
  @Input()
  ntlPreventDefault: string[];

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (this.ntlPreventDefault.includes(e?.code)) {
      e.preventDefault();
    }
  }
}
