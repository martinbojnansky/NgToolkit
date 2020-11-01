import { ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TestAction,
  TestState,
  TestStateChange,
  TestStore,
} from './observable-store.spec';
import { ObservableStoreComponent } from './observable-store.component';

@Component({
  template: ` <p>{{ store.state.testValue }}</p> `,
})
class ObservableStoreTestComponent extends ObservableStoreComponent<TestState, TestAction> {
  constructor(
    public store: TestStore,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    super(store, changeDetectorRef);
  }

  protected onStateChange(change: TestStateChange) {
    if (change.action === 'null') {
      return;
    }

    super.onStateChange(change);
  }
}

describe('ObservableStoreComponent', () => {
  let component: ObservableStoreTestComponent;
  let fixture: ComponentFixture<ObservableStoreTestComponent>;
  let compiled: DebugElement;

  let changeDetectorRefSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObservableStoreTestComponent],
      providers: [TestStore],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableStoreTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement;

    changeDetectorRefSpy = spyOn(component.changeDetectorRef, 'markForCheck');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark component for change detection', () => {
    component.markForChangeDetection();
    expect(changeDetectorRefSpy).toHaveBeenCalledTimes(1);
  });

  it('should listen for state change', () => {
    component.store.patchState('patchPartialState', {
      firstName: 'xxx',
    });
    expect(changeDetectorRefSpy).toHaveBeenCalledTimes(1);
  });

  it('should not listen for state change after destroy', () => {
    component.ngOnDestroy();
    component.store.patchState('patchPartialState', {
      firstName: 'xxx',
    });
    expect(changeDetectorRefSpy).not.toHaveBeenCalled();
  });

  it('should not run change detection on explicitly ignored action', () => {
    component.store.patchState('null', null);
    expect(changeDetectorRefSpy).toHaveBeenCalledTimes(0);
  });
});
