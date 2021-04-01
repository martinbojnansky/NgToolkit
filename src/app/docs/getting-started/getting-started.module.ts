import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentsScrollspyModule } from 'src/app/shared/contents-scrollspy/contents-scrollspy.module';
import { HighlightingModule } from 'src/app/shared/highlighting/highlighting.module';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { IntroductionComponent } from './introduction/introduction.component';

@NgModule({
  declarations: [IntroductionComponent],
  imports: [
    CommonModule,
    GettingStartedRoutingModule,
    ContentsScrollspyModule,
    HighlightingModule,
  ],
})
export class GettingStartedModule {}
