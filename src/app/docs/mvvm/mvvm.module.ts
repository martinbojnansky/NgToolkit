import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MvvmRoutingModule } from './mvvm-routing.module';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    MvvmRoutingModule,
    SharedModule
  ],
})
export class MvvmModule { }
