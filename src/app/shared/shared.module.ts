import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BootstrapModule } from './components/bootstrap/bootstrap.module';
import { ContentsScrollspyModule } from './components/contents-scrollspy/contents-scrollspy.module';
import { HighlightingModule } from './components/highlighting/highlighting.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BootstrapModule, ContentsScrollspyModule, HighlightingModule],
  exports: [CommonModule, BootstrapModule, ContentsScrollspyModule, HighlightingModule]
})
export class SharedModule { }
