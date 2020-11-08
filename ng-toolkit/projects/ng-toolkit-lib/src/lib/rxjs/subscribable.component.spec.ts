import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { SubscribableComponent } from './subscribable.component';

const delay = 50;

class SubscribableTestComponent extends SubscribableComponent {
  completedCount = 0;
  completedValue = '';

  updateValue(value: string) {
    this.subscribeSafe('updateValue', this.apiCall(value), {
      next: () => {
        this.completedCount++;
        this.completedValue = value;
      },
    });
  }

  private apiCall(value: string): Observable<string> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(value);
        observer.complete();
      }, delay);
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

  it('should finish in a time', async(() => {
    expect(component.completedCount).toBe(0);
    expect(component.completedValue).toBe('');
    component.updateValue('xxx');
    setTimeout(() => {
      expect(component.completedCount).toBe(1);
      expect(component.completedValue).toBe('xxx');
    }, delay);
  }));

  it('should not finish soon', async(() => {
    expect(component.completedCount).toBe(0);
    expect(component.completedValue).toBe('');
    component.updateValue('xxx');
    setTimeout(() => {
      expect(component.completedCount).toBe(0);
      expect(component.completedValue).toBe('');
    }, delay - 1);
  }));

  it('should finish only last', async(() => {
    expect(component.completedCount).toBe(0);
    expect(component.completedValue).toBe('');
    component.updateValue('xxx');
    component.updateValue('yyy');
    component.updateValue('zzz');
    setTimeout(() => {
      expect(component.completedCount).toBe(1);
      expect(component.completedValue).toBe('zzz');
    }, delay);
  }));

  it('should not finish on component destroy', async(() => {
    expect(component.completedCount).toBe(0);
    expect(component.completedValue).toBe('');
    component.updateValue('xxx');
    component.ngOnDestroy();
    setTimeout(() => {
      expect(component.completedCount).toBe(0);
      expect(component.completedValue).toBe('');
    }, delay);
  }));
});
