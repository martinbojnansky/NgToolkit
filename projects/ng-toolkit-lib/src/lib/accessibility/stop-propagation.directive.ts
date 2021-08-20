import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ntlStopPropagation]',
})
export class StopPropagationDirective {
  @Input()
  ntlStopPropagation: string[];

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (this.ntlStopPropagation.includes(e?.code)) {
      e.stopPropagation();
    }
  }
}
