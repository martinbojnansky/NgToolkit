import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsComponent } from './effects/effects.component';
import { ObservableUnsubscriberComponent } from './observable-unsubscriber.ts/observable-unsubscriber.ts.component';

const routes: Routes = [{ path: 'observable-unsubscriber', component: ObservableUnsubscriberComponent }, { path: 'effects', component: EffectsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RxjsRoutingModule { }
