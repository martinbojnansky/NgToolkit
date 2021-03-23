import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ViewModel } from 'dist/ng-toolkit-lib';
import { CrudService } from '../services/crud.service';

@Injectable()
export abstract class CrudDetailViewModel<TDetail = any> extends ViewModel {
  abstract detail: FormGroup;

  constructor() {
    super();
  }

  onInit(): void {
    this.changes$.next(1);
    this.detail.valueChanges
      .pipe(this.unsubscriber.onDestroy())
      .subscribe((v) => {
        this.changes$.next(this.changes$.value + 1);
      });
    this.load(1);
  }

  load(id: number): void {
    this.detail.reset();
    this.crudService
      .readDetail(id)
      .pipe(this.unsubscriber.onDestroyOrResubscribe('load'))
      .subscribe((detail) => {
        this.detail.patchValue(detail);
      });
  }

  protected abstract readonly crudService: CrudService<
    number,
    unknown,
    TDetail
  >;
}
