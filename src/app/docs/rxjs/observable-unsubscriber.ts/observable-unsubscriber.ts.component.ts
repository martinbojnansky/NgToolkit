import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-observable-unsubscriber.ts',
  templateUrl: './observable-unsubscriber.ts.component.html',
  styleUrls: ['./observable-unsubscriber.ts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObservableUnsubscriberComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
