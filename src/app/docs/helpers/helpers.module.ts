import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HelpersRoutingModule } from './helpers-routing.module';
import { NameofComponent } from './nameof/nameof.component';
import { TrySafeComponent } from './try-safe/try-safe.component';
import { UuidComponent } from './uuid/uuid.component';

@NgModule({
  declarations: [TrySafeComponent, UuidComponent, NameofComponent],
  imports: [
    HelpersRoutingModule,
    SharedModule
  ],
})
export class HelpersModule { }
