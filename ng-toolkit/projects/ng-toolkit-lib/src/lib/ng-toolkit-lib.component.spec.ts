import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgToolkitLibComponent } from './ng-toolkit-lib.component';

describe('NgToolkitLibComponent', () => {
  let component: NgToolkitLibComponent;
  let fixture: ComponentFixture<NgToolkitLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgToolkitLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgToolkitLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
