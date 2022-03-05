import { TestBed } from '@angular/core/testing';
import { JsonModule } from './json.module';
import { JsonService } from './json.service';

interface SerializableObject {
  text: string;
  num: number;
  array: number[];
  date: Date;
  dates: Date[];
  obj: {
    bool: boolean;
    date2: Date;
  };
}

const defaultObject: SerializableObject = {
  text: 'text',
  num: 123,
  array: [1, 2, 3],
  date: new Date('1994-01-01 12:00'),
  dates: [new Date('1994-01-02 12:00'), new Date('1994-01-03 12:00')],
  obj: {
    bool: true,
    date2: new Date('1994-01-02 12:00'),
  },
};

describe('JsonService', () => {
  let service: JsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonModule.forRoot(null)],
    });

    service = TestBed.inject(JsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should serialize and deserialize', () => {
    const json = service.serialize(defaultObject);
    const obj = service.deserialize(json);
    expect(obj).not.toBe(defaultObject);
    expect(obj).toEqual(defaultObject);
  });

  it('should create a deep clone', () => {
    const clone = service.deepClone(defaultObject);
    expect(clone).not.toBe(defaultObject);
    expect(clone).toEqual(defaultObject);
    expect(clone.obj).not.toBe(defaultObject.obj);
    expect(clone.obj).toEqual(defaultObject.obj);
  });
});
