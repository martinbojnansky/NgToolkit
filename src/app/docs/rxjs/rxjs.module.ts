import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsComponent } from './effects/effects.component';
import { ObservableUnsubscriberComponent } from './observable-unsubscriber.ts/observable-unsubscriber.ts.component';
import { RxjsRoutingModule } from './rxjs-routing.module';

@NgModule({
  declarations: [ObservableUnsubscriberComponent, EffectsComponent],
  imports: [RxjsRoutingModule, SharedModule],
})
export class RxjsModule { }
