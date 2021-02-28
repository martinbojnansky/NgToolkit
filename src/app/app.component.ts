import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly samples = [
    {
      link: '',
      label: 'Home',
    },
    {
      link: 'store-sample',
      label: 'Store sample',
    },
  ];
}
