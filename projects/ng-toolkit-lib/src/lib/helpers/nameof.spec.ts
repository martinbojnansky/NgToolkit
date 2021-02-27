import { nameof } from './nameof';

interface TestType {
  a: string;
  b: number;
  c: () => {};
}

describe('nameof', () => {
  it('should return correct name when type provided', () => {
    expect(nameof<TestType>('a')).toBe('a');
    expect(nameof<TestType>('b')).toBe('b');
    expect(nameof<TestType>('c')).toBe('c');
  });

  it('should return correct name when instance provided', () => {
    const obj = {} as TestType;
    expect(nameof('a', obj)).toBe('a');
    expect(nameof('b', obj)).toBe('b');
    expect(nameof('c', obj)).toBe('c');
  });
});
