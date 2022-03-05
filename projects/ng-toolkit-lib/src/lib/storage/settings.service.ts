import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from './storage.service';

abstract class SettingsService {
  constructor(protected storageService: Storage) {}

  get<T>(key: string, defaultValue: T = null): T | null {
    const value = this.storageService.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  }

  set<T>(key: string, value: T): void {
    this.storageService.setItem(key, JSON.stringify(value));
  }
}

@Injectable()
export class LocalSettingsService extends SettingsService {
  constructor(protected localStorageService: LocalStorageService) {
    super(localStorageService);
  }
}

@Injectable()
export class SessionSettingsService extends SettingsService {
  constructor(protected sessionStorageService: SessionStorageService) {
    super(sessionStorageService);
  }
}
