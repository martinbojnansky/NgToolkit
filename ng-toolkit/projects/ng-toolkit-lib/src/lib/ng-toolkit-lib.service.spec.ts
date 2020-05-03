import { TestBed } from '@angular/core/testing';

import { NgToolkitLibService } from './ng-toolkit-lib.service';

describe('NgToolkitLibService', () => {
  let service: NgToolkitLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgToolkitLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
