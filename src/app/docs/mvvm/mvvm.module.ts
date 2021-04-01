import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentsScrollspyModule } from 'src/app/shared/contents-scrollspy/contents-scrollspy.module';
import { HighlightingModule } from 'src/app/shared/highlighting/highlighting.module';
import { MvvmRoutingModule } from './mvvm-routing.module';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    MvvmRoutingModule,
    ContentsScrollspyModule,
    HighlightingModule,
  ],
})
export class MvvmModule {}
