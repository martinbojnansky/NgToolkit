import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-translation-sample-app-component',
  template: '<router-outlet><router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent { }
