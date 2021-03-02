import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslationGuard } from 'dist/ng-toolkit-lib';
import { TranslationModules } from './translation/translation.module';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [TranslationGuard],
    children: [
      {
        path: 'store-sample',
        loadChildren: () =>
          import('./store-sample/store-sample.module').then(
            (m) => m.StoreSampleModule
          ),
        data: {
          ...TranslationGuard.withModule<TranslationModules>('storeSample'),
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
