import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslationGuard } from 'dist/ng-toolkit-lib';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'docs',
  },
  {
    path: 'docs',
    loadChildren: () => import('./docs/docs.module').then((m) => m.DocsModule),
  },
  {
    path: 'translation-sample',
    canActivateChild: [TranslationGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./translation-sample/translation-sample.module').then(
            (m) => m.TranslationSampleModule
          ),
        data: {
          translationModules: ['translationSample'],
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
