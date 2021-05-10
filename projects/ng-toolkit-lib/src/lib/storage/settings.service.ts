import { Injectable } from '@angular/core';
import { trySafe } from '../helpers';
import { LocalStorageService } from './storage.service';

abstract class SettingsService {
  constructor(protected storageService: Storage) {}

  get<T>(key: string, defaultValue?: T): T {
    const value = this.storageService.getItem(key);
    return trySafe(() => JSON.parse(value), value) || defaultValue;
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
  constructor(protected localStorageService: LocalStorageService) {
    super(localStorageService);
  }
}
