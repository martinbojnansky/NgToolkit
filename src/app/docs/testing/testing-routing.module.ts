import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HarnessComponent } from './harness/harness.component';

const routes: Routes = [{ path: 'harness', component: HarnessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestingRoutingModule { }
