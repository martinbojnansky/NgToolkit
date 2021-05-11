import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-try-safe',
  templateUrl: './try-safe.component.html',
  styleUrls: ['./try-safe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrySafeComponent {
  readonly snippets = {
    samples: `import { trySafe } from 'ng-toolkit-lib'

...

const value = { a: { b: { c: [] } } };
trySafe(() => value.a.b.c[10], 'error') === 'error';

...

const value: TestType = undefined;
trySafe(() => value.a.b.c) === value?.a?.b?.c === null;

const value = null;
trySafe(() => value.a.b.c) === value?.a?.b?.c === null;

const value: TestType = {};
trySafe(() => value.a.b.c) === value?.a?.b?.c === null;

const value = { a: {} };
trySafe(() => value.a.b.c) === value?.a?.b?.c === null;

const value = { a: { b: {} } };
trySafe(() => value.a.b.c) === value?.a?.b?.c === null;

const value = { a: { b: { c: 100 } } };
trySafe(() => value.a.b.c.toString()) === value?.a?.b?.c?.toString() === '100';

const value = { a: { b: { c: null } } };
trySafe(() => value.a.b.c.toString(), 'failed') === (value?.a?.b?.c?.toString() || 'failed) === 'failed';
`,
  };
}
