import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroductionComponent } from './introduction/introduction.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'introduction' },
  { path: 'introduction', component: IntroductionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GettingStartedRoutingModule {}
