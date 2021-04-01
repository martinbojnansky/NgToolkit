import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CodeHighlighterComponent } from './code-highlighter/code-highlighter.component';

@NgModule({
  declarations: [CodeHighlighterComponent],
  imports: [CommonModule],
  exports: [CodeHighlighterComponent],
})
export class HighlightingModule {}
