import { Injectable } from '@angular/core';
import { ViewModel } from 'dist/ng-toolkit-lib';
import { BehaviorSubject } from 'rxjs';
import { CrudDetail } from '../../models/crud/crud';
import { CrudService } from '../../services/crud/crud.service';

@Injectable()
export abstract class CrudDetailViewModel<
  TDetail = CrudDetail
> extends ViewModel {
  detail$ = new BehaviorSubject<TDetail>({} as TDetail);

  constructor() {
    super();
    this.init();
  }

  load(id: number): void {
    this.detail$.next({} as TDetail);
    this.crudService
      .readDetail(id)
      .pipe(this.unsubscriber.onDestroyOrResubscribe('load'))
      .subscribe((detail) => {
        this.detail$.next(detail);
      });
  }

  protected abstract readonly crudService: CrudService<
    number,
    unknown,
    TDetail
  >;
}
