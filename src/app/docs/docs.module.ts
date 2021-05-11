import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';

@NgModule({
  declarations: [DocsComponent],
  imports: [DocsRoutingModule, SharedModule],
})
export class DocsModule { }
