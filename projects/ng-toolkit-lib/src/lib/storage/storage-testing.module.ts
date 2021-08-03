import { NgModule, Type } from '@angular/core';
import { StorageModule } from './storage.module';
import { LocalStorageService, SessionStorageService } from './storage.service';

export const createStorageMock = <T extends Storage>(
  type: Type<T>
): jasmine.Spy => {
  let storage: any = {};
  const spy = jasmine.createSpyObj(type.name, [
    'clear',
    'getItem',
    'key',
    'removeItem',
    'setItem',
  ]);

  spy.clear.and.callFake(() => {
    storage = {};
  });

  spy.getItem.and.callFake((key: string) => {
    return key in storage ? storage[key] : null;
  });

  spy.setItem.and.callFake((key: string, value: string) => {
    storage[key] = value || '';
  });

  spy.removeItem.and.callFake((key: string) => {
    delete storage[key];
  });

  spy.key.and.callFake((index: number) => {
    return Object.keys(storage)[index] || null;
  });

  return spy;
};

@NgModule({
  declarations: [],
  imports: [StorageModule],
  providers: [
    {
      provide: LocalStorageService,
      useFactory: () => createStorageMock(LocalStorageService),
    },
    {
      provide: SessionStorageService,
      useFactory: () => createStorageMock(SessionStorageService),
    },
  ],
})
export class StorageTestingModule {}
