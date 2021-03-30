import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { SampleDetail } from '../../models/samples/samples';

@Injectable()
export class SampleService {
  readDetail(id: number) {
    return of(1).pipe(
      delay(2000),
      map(
        () =>
        ({
          id,
          name: `Name ${id}`,
          description: `Description ${id}`
        } as SampleDetail)
      )
    );
  }
}
