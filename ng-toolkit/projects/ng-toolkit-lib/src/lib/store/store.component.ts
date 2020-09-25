import { ChangeDetectorRef, OnInit } from '@angular/core';
import { SubscribableComponent } from '../rxjs';
import { ObservableStateChange, ObservableStore } from './observable-store';

export class StoreComponent<TState, TAction> extends SubscribableComponent
  implements OnInit {
  constructor(
    protected store: ObservableStore<TState, TAction>,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeSafe(
      'stateChange',
      this.store.stateChange$,
      this.onStateChange.bind(this)
    );
  }

  markForChangeDetection() {
    if (this.store.config.log) {
      console.log(
        `${this.constructor.name} has been marked for change detection.`
      );
    }

    this.changeDetectorRef.markForCheck();
  }

  protected onStateChange(change: ObservableStateChange<TState, TAction>) {
    this.markForChangeDetection();
  }
}
