import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ngtlStopPropagation]',
})
export class StopPropagationDirective {
  @Input()
  ngtlStopPropagation: string[];

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (this.ngtlStopPropagation.includes(e?.code)) {
      e.stopPropagation();
    }
  }
}
