import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsComponent } from './docs.component';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'getting-started',
      },
      {
        path: 'getting-started',
        loadChildren: () =>
          import('./getting-started/getting-started.module').then(
            (m) => m.GettingStartedModule
          ),
      },
      {
        path: 'mvvm',
        loadChildren: () =>
          import('./mvvm/mvvm.module').then((m) => m.MvvmModule),
      },
      {
        path: 'translation',
        loadChildren: () =>
          import('./translation/translation.module').then(
            (m) => m.TranslationModule
          ),
      },
      {
        path: 'observable-store',
        loadChildren: () =>
          import('./observable-store/observable-store.module').then(
            (m) => m.ObservableStoreModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocsRoutingModule {}
