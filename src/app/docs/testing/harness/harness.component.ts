import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-harness',
  templateUrl: './harness.component.html',
  styleUrls: ['./harness.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HarnessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
