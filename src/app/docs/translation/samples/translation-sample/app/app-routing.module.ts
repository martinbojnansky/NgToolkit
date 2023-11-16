import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { translationGuard } from 'dist/ng-toolkit-lib';
import { TranslationService } from './core/services/translation.service';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [translationGuard<TranslationService>(['translated'])],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./translated/translated.module').then(
            (m) => m.TranslatedModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
