import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentsScrollspyModule } from 'src/app/shared/contents-scrollspy/contents-scrollspy.module';
import { HighlightingModule } from 'src/app/shared/highlighting/highlighting.module';
import { OverviewComponent } from './overview/overview.component';
import { TranslationRoutingModule } from './translation-routing.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    TranslationRoutingModule,
    ContentsScrollspyModule,
    HighlightingModule,
  ],
})
export class TranslationModule {}
