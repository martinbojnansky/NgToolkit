import { TestBed } from '@angular/core/testing';
import {
  LocalSettingsService,
  SessionSettingsService,
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

  it('should not fail for the first time', () => {
    expect(service.get('xxx')).toBeNull();
  });

  it('should return default', () => {
    expect(service.get('xxx', true)).toEqual(true);
  });

  it('should set value', () => {
    expect(service.set('xxx', true));
    expect(service.get('xxx')).toEqual(true);

    expect(service.set('xxx', false));
    expect(service.get('xxx')).toEqual(false);

    expect(service.set('xxx', null));
    expect(service.get('xxx')).toEqual(null);
  });
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

  it('should not fail for the first time', () => {
    expect(service.get('xxx')).toBeNull();
  });

  it('should return default', () => {
    expect(service.get('xxx', true)).toEqual(true);
  });

  it('should set value', () => {
    expect(service.set('xxx', true));
    expect(service.get('xxx')).toEqual(true);

    expect(service.set('xxx', false));
    expect(service.get('xxx')).toEqual(false);

    expect(service.set('xxx', null));
    expect(service.get('xxx')).toEqual(null);
  });
});
