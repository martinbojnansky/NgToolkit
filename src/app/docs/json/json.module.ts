import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { JsonRoutingModule } from './json-routing.module';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [JsonRoutingModule, SharedModule],
})
export class JsonModule { }
