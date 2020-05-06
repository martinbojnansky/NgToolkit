import { ChangeDetectorRef, OnInit } from '@angular/core';
import { ObservableStateChange, ObservableStore } from './observable-store';
import { SubscribableComponent } from './subscribable.component';

export abstract class StoreComponent<TState, TAction>
  extends SubscribableComponent
  implements OnInit {
  constructor(
    protected store: ObservableStore<TState, TAction>,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.store.stateChange$
      .pipe(this.untilDestroyed())
      .subscribe(this.onStateChange.bind(this));
  }

  // @logChangeDetectionMark()
  markForChangeDetection() {
    this.changeDetectorRef.markForCheck();
  }

  protected onStateChange(change: ObservableStateChange<TState, TAction>) {
    this.markForChangeDetection();
  }
}

// export function logChangeDetectionMark(): (
//   target: StoreComponent<any, any>,
//   prop: string | symbol,
//   descriptor: PropertyDescriptor
// ) => PropertyDescriptor {
//   return (target, propertyKey, descriptor) => {
//     // if (!environment.production) {
//     const originalMethod = descriptor.value;
//     descriptor.value = (): void => {
//       console.log(
//         `${this.constructor.name} has been marked for change detection.`
//       );
//       originalMethod.apply(this, arguments);
//     };
//     // }

//     return descriptor;
//   };
// }
