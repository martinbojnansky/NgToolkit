import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nameof',
  templateUrl: './nameof.component.html',
  styleUrls: ['./nameof.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameofComponent {
  readonly snippets = {
    samples: `import { nameof } from 'ng-toolkit-lib'

...

interface TestType {
  a: string;
  b: number;
  c: () => {};
}

nameof<TestType>('a')

nameof('c', obj)
`,
  };
}
