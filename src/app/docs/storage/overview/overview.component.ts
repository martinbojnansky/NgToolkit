import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  readonly snippets = {
    import: `import { SettingsModule } from 'ng-toolkit-lib'

...

@NgModule({
  declarations: [],
  imports: [
    SettingsModule
  ],
})
export class CoreModule { }
`,
    testImport: `TestBed.configureTestingModule({
  imports: [StorageTestingModule]
});`,
  };
}
