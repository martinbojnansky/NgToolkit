import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrySafeComponent } from './components/try-safe/try-safe.component';
import { UuidComponent } from './components/uuid/uuid.component';

const routes: Routes = [
  { path: 'trysafe', component: TrySafeComponent },
  { path: 'uuid', component: UuidComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpersRoutingModule {}
