import { trySafe } from './try-safe';

interface TestType {
  a: {
    b: {
      c: number;
    };
  };
}

describe('trySafe', () => {
  it('should catch undefined', () => {
    const value: TestType = undefined;
    expect(trySafe(() => value.a.b.c)).toBeNull();
  });

  it('should catch null', () => {
    const value: TestType = null;
    expect(trySafe(() => value.a.b.c)).toBeNull();
  });

  it('should catch empty', () => {
    const value: TestType = {} as TestType;
    expect(trySafe(() => value.a.b.c)).toBeNull();
  });

  it('should catch 1st level', () => {
    const value: TestType = { a: {} } as TestType;
    expect(trySafe(() => value.a.b.c)).toBeNull();
  });

  it('should catch 2nd level', () => {
    const value: TestType = { a: { b: {} } } as TestType;
    expect(trySafe(() => value.a.b.c)).toBeNull();
  });

  it('should return value', () => {
    const value: TestType = { a: { b: { c: 100 } } };
    expect(trySafe(() => value.a.b.c.toString())).toBe('100');
  });

  it('should return fail result on fail', () => {
    const value: TestType = { a: { b: { c: null } } };
    expect(trySafe(() => value.a.b.c.toString(), 'failed')).toBe('failed');
  });
});
