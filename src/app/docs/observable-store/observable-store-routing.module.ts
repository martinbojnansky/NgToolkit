import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: 'overview', component: OverviewComponent },
  {
    path: 'samples',
    children: [
      {
        path: 'store-sample',
        loadChildren: () =>
          import('./samples/store-sample/store-sample.module').then(
            (m) => m.StoreSampleModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservableStoreRoutingModule {}
