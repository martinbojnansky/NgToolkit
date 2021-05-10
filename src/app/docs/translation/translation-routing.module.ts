import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: 'overview', component: OverviewComponent },
  {
    path: 'samples',
    children: [{
      path: 'translation-sample',
      loadChildren: () =>
        import('./samples/translation-sample/app/app.module').then(
          (m) => m.AppModule
        ),
    }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslationRoutingModule { }
