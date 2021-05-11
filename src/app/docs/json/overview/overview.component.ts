import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getLinkToFragment } from 'src/app/shared/helpers/fragment';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent {
  readonly snippets = {
    import: `import { JsonModule } from 'ng-toolkit-lib'

...

@NgModule({
  declarations: [],
  imports: [
    JsonModule.forRoot()
  ],
})
export class CoreModule { }
`,
    importConfigured: `JsonModule.forRoot({
  dateFormat: /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/,
  interceptor: true
})
`,
    defaultDateFormat: `/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/`,
    jsonConfig: `{
  dateFormat: /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/,
  interceptor: true
} as JsonConfig
`,
  };

  getLinkToFragment(fragment: string): string {
    return getLinkToFragment(fragment);
  }
}
