import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsScrollspyComponent } from './contents-scrollspy.component';

describe('ContentsScrollspyComponent', () => {
  let component: ContentsScrollspyComponent;
  let fixture: ComponentFixture<ContentsScrollspyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentsScrollspyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsScrollspyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
