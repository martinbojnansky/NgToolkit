import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslationGuard } from './translation/translation.guard';

const routes: Routes = [
  {
    path: 'store-sample',
    canActivate: [TranslationGuard],
    loadChildren: () =>
      import('./store-sample/store-sample.module').then(
        (m) => m.StoreSampleModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
