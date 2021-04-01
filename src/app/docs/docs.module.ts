import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';

@NgModule({
  declarations: [DocsComponent],
  imports: [CommonModule, DocsRoutingModule],
})
export class DocsModule {}
