import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  LocalSettingsService,
  SessionSettingsService,
} from './settings.service';
import { LocalStorageService, SessionStorageService } from './storage.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: LocalStorageService,
      useValue: localStorage,
    },
    {
      provide: SessionStorageService,
      useValue: sessionStorage,
    },
    LocalSettingsService,
    SessionSettingsService,
  ],
})
export class StorageModule {}
