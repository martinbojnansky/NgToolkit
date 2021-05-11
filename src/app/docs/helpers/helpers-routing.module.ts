import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NameofComponent } from './nameof/nameof.component';
import { TrySafeComponent } from './try-safe/try-safe.component';
import { UuidComponent } from './uuid/uuid.component';

const routes: Routes = [
  { path: 'nameof', component: NameofComponent },
  { path: 'trysafe', component: TrySafeComponent },
  { path: 'uuid', component: UuidComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpersRoutingModule { }
