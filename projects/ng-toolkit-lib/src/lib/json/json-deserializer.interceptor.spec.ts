import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { JsonModule } from './json.module';

interface TestObject {
  a: string;
  b: Date;
  c: Date[];
  d: {
    a: string;
    b: Date;
    c: Date[];
  };
}

const correctObject: TestObject = {
  a: 'aaa',
  b: new Date('1994-01-01'),
  c: [new Date('1994-01-02 12:00'), new Date('1994-01-03 12:00')],
  d: {
    a: 'aaa',
    b: new Date('1994-01-01 12:00'),
    c: [new Date('1994-01-02 12:00'), new Date('1994-01-03 12:00')],
  },
};
const incorrectObject: TestObject = JSON.parse(JSON.stringify(correctObject));

describe('JsonDeserializerInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JsonModule.forRoot({ interceptor: true }),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not have serialized date', () => {
    expect(typeof incorrectObject.b).toBe('string');
    expect(incorrectObject.b.getDate).toBeUndefined();
  });

  it(
    'should deserialize objects',
    waitForAsync(() => {
      http.get(`api/xxx`).subscribe({
        next: (object: any) => {
          expect(object).toEqual(correctObject);
          expect(object.b.getDate).toBeDefined();
          expect(object.b.getDate()).toBe(correctObject.b.getDate());
        },
      });
      httpMock.expectOne(`api/xxx`).flush(incorrectObject);
    })
  );
});
