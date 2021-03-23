import { Observable } from 'rxjs';

export abstract class CrudService<TId, TSummary, TDetail> {
  constructor() {}

  abstract readDetail(id: TId): Observable<TDetail>;
}
