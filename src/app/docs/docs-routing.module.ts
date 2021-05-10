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
        path: 'helpers',
        loadChildren: () =>
          import('./helpers/helpers.module').then((m) => m.HelpersModule),
      },
      {
        path: 'json',
        loadChildren: () =>
          import('./json/json.module').then((m) => m.JsonModule),
      },
      {
        path: 'mvvm',
        loadChildren: () =>
          import('./mvvm/mvvm.module').then((m) => m.MvvmModule),
      },
      {
        path: 'observable-store',
        loadChildren: () =>
          import('./observable-store/observable-store.module').then(
            (m) => m.ObservableStoreModule
          ),
      },
      {
        path: 'rxjs',
        loadChildren: () =>
          import('./rxjs/rxjs.module').then((m) => m.RxjsModule),
      },
      {
        path: 'storage',
        loadChildren: () =>
          import('./storage/storage.module').then((m) => m.StorageModule),
      },
      {
        path: 'testing',
        loadChildren: () =>
          import('./testing/testing.module').then((m) => m.TestingModule),
      },
      {
        path: 'translation',
        loadChildren: () =>
          import('./translation/translation.module').then(
            (m) => m.TranslationModule
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
