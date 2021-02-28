import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreSampleTestingModule } from '../../store-sample-testing.module';
import { StoreSampleComponent } from './store-sample.component';

describe('StoreSamplesComponent', () => {
  let component: StoreSampleComponent;
  let fixture: ComponentFixture<StoreSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreSampleTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
