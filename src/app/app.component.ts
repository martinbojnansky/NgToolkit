import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { actions } from './store/actions';
import { Store } from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly samples = [
    {
      link: '',
      label: 'Home',
    },
    {
      link: 'store-sample',
      label: 'Store sample',
    },
  ];

  constructor(protected store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(actions.sayHi.create({ name: 'bla bla' }));
    //this.store.dispatch(actions.sayHiAsync.create({ name: 'bla bla' }));
  }
}
