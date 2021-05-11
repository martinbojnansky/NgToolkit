import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentsScrollspyComponent } from './contents-scrollspy/contents-scrollspy.component';

@NgModule({
  declarations: [ContentsScrollspyComponent],
  imports: [CommonModule],
  exports: [ContentsScrollspyComponent],
})
export class ContentsScrollspyModule { }
