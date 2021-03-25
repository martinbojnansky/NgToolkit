import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { SampleDetail, SampleSummary } from '../../models/samples/samples';
import { CrudService } from '../crud/crud.service';

@Injectable({ providedIn: 'root' })
export class SampleService extends CrudService<
  number,
  SampleSummary,
  SampleDetail
> {
  readDetail(id: number) {
    return of(1).pipe(
      delay(2000),
      map(
        () =>
          ({
            id,
            name: `Name ${id}`,
            description: `Description ${id}`,
            type:
              id % 3 === 0 ? 'Expert' : id % 3 === 2 ? 'Advanced' : 'Beginner',
          } as SampleDetail)
      )
    );
  }
}
