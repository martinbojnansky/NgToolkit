import { pathof } from './pathof';

interface TestType {
  a: {
    a1: {
      a1x: {
        a1x1: {
          a1x1i: () => void;
        };
        a1x2: string[];
      };
    };
  };
  b: {
    b1: number;
    b2: boolean;
  };
}

describe('pathof', () => {
  it('should return correct path', () => {
    const obj = {} as TestType;
    expect(pathof(obj, 'a')).toBe('a');
    expect(pathof(obj, 'a', 'a1')).toBe('a.a1');
    expect(pathof(obj, 'a', 'a1', 'a1x')).toBe('a.a1.a1x');
    expect(pathof(obj, 'a', 'a1', 'a1x', 'a1x1')).toBe('a.a1.a1x.a1x1');
    expect(pathof(obj, 'a', 'a1', 'a1x', 'a1x1', 'a1x1i')).toBe(
      'a.a1.a1x.a1x1.a1x1i'
    );
  });
});
