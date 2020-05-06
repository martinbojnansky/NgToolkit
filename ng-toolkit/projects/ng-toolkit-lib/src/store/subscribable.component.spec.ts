import { async } from '@angular/core/testing';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SubscribableComponent } from './subscribable.component';

const initialValue = '123';
const newValue = '456';

class SubscribableTestComponent extends SubscribableComponent {
  observable$ = new BehaviorSubject(initialValue);
  subscription: Subscription;

  updateValue(value: string) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = new Observable((observer) => {
      setTimeout(() => {
        observer.next(value);
        observer.complete();
      }, 300);
    })
      .pipe(this.untilDestroyed())
      .subscribe({
        next: (v: string) => {
          this.observable$.next(v);
        },
      });
  }
}

describe('SubscribableComponent', () => {
  let component: SubscribableTestComponent;

  beforeEach(() => {
    component = new SubscribableTestComponent();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen to an observable', async(() => {
    expect(component.observable$.value).toBe(initialValue);
    component.updateValue(newValue);
    component.observable$.subscribe({
      complete: () => {
        expect(component.observable$.value).toBe(newValue);
      },
    });
  }));

  it('should stop listening to an observable on destroy', async(() => {
    expect(component.observable$.value).toBe(initialValue);
    component.updateValue(newValue);
    component.ngOnDestroy();
    component.observable$.subscribe({
      complete: () => {
        fail('should not complete');
      },
    });
    expect(component.observable$.value).toBe(initialValue);
  }));
});
