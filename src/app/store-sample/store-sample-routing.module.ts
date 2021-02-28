import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreSampleComponent } from './components/store-sample/store-sample.component';

const routes: Routes = [
  {
    path: '',
    component: StoreSampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreSampleRoutingModule {}
