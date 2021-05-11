import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { IntroductionComponent } from './introduction/introduction.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';

@NgModule({
  declarations: [IntroductionComponent, ReleaseNotesComponent],
  imports: [
    GettingStartedRoutingModule,
    SharedModule
  ],
})
export class GettingStartedModule { }
