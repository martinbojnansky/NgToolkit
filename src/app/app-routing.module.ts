import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslationGuard } from 'dist/ng-toolkit-lib';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [TranslationGuard],
    children: [
      {
        path: 'mvvm-sample',
        loadChildren: () =>
          import('./mvvm-sample/mvvm-sample.module').then(
            (m) => m.MvvmSampleModule
          ),
      },
      {
        path: 'translation-sample',
        loadChildren: () =>
          import('./translation-sample/translation-sample.module').then(
            (m) => m.TranslationSampleModule
          ),
        data: {
          translationModules: ['translationSample'],
        },
      },
      {
        path: 'store-sample',
        loadChildren: () =>
          import('./store-sample/store-sample.module').then(
            (m) => m.StoreSampleModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
