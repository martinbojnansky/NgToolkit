import { TestBed } from '@angular/core/testing';
import { StoreSampleTestingModule } from '../store-sample-testing.module';
import { StoreSampleService } from './store-sample.service';

describe('StoreSampleService', () => {
  let service: StoreSampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreSampleTestingModule],
    });
    service = TestBed.inject(StoreSampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
