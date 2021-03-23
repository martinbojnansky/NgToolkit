import { Injectable } from '@angular/core';
import { Property, ViewModel } from 'dist/ng-toolkit-lib';
import { CrudService } from '../services/crud.service';

@Injectable()
export abstract class CrudDetailViewModel<TDetail = any> extends ViewModel {
  @Property()
  detail: TDetail;

  abstract readonly isEditable: boolean;
  abstract editable: boolean;

  constructor() {
    super();
  }

  onInit(): void {
    this.load(1);
  }

  load(id: number): void {
    this.detail = null;
    this.crudService.readDetail(id).subscribe((detail) => {
      this.detail = detail;
    });
  }

  protected abstract readonly crudService: CrudService<
    number,
    unknown,
    TDetail
  >;
}
