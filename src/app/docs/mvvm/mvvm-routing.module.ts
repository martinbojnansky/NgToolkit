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
        path: 'mvvm-sample',
        loadChildren: () =>
          import('./samples/mvvm-sample/mvvm-sample.module').then(
            (m) => m.MvvmSampleModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MvvmRoutingModule {}
