import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-code-highlighter',
  templateUrl: './code-highlighter.component.html',
  styleUrls: ['./code-highlighter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeHighlighterComponent implements OnInit {
  @Input()
  code: string;

  constructor() {}

  ngOnInit(): void {}

  copyToClipboard() {
    alert('Sorry, this functionality is not yet implemented.');
  }
}
