import { TestBed } from '@angular/core/testing';
import {
  LocalSettingsService,
  SessionSettingsService
} from './settings.service';
import { StorageTestingModule } from './storage-testing.module';

describe('LocalSettingsService', () => {
  let service: LocalSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StorageTestingModule],
    });
    service = TestBed.inject(LocalSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Add tests
});

describe('SessionSettingsService', () => {
  let service: SessionSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StorageTestingModule],
    });
    service = TestBed.inject(SessionSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Add tests
});
