import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { JsonRoutingModule } from './json-routing.module';

@NgModule({
  declarations: [],
  imports: [JsonRoutingModule, SharedModule],
})
export class JsonModule {}
