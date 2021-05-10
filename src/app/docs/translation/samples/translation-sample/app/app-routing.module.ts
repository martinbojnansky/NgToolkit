import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslationGuard } from 'dist/ng-toolkit-lib';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [TranslationGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./translated/translated.module').then(
            (m) => m.TranslatedModule
          ),
        data: {
          translationModules: ['translated'],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
