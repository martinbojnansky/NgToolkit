import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentsScrollspyModule } from 'src/app/shared/contents-scrollspy/contents-scrollspy.module';
import { HighlightingModule } from 'src/app/shared/highlighting/highlighting.module';
import { TrySafeComponent } from './components/try-safe/try-safe.component';
import { HelpersRoutingModule } from './helpers-routing.module';
import { UuidComponent } from './components/uuid/uuid.component';

@NgModule({
  declarations: [TrySafeComponent, UuidComponent],
  imports: [
    CommonModule,
    HelpersRoutingModule,
    ContentsScrollspyModule,
    HighlightingModule,
  ],
})
export class HelpersModule {}
