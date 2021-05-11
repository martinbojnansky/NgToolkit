import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestingRoutingModule } from './testing-routing.module';
import { HarnessComponent } from './harness/harness.component';

@NgModule({
  declarations: [
    HarnessComponent
  ],
  imports: [TestingRoutingModule, SharedModule],
})
export class TestingModule { }
