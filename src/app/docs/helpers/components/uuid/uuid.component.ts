import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-uuid',
  templateUrl: './uuid.component.html',
  styleUrls: ['./uuid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UuidComponent {
  readonly snippets = {
    sample: `import { uuid } from 'ng-toolkit-lib'

...

uuid()`,
  };

  constructor() {}
}
