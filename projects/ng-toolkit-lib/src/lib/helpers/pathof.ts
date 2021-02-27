export function pathof<T, P1 extends keyof T>(obj: T, prop1: P1): string;

export function pathof<T, P1 extends keyof T, P2 extends keyof T[P1]>(obj: T, prop1: P1, prop2: P2): string;

export function pathof<T, P1 extends keyof T, P2 extends keyof T[P1], P3 extends keyof T[P1][P2]>(
  obj: T,
  prop1: P1,
  prop2: P2,
  prop3: P3
): string;

export function pathof<T, P1 extends keyof T, P2 extends keyof T[P1], P3 extends keyof T[P1][P2], P4 extends keyof T[P1][P2][P3]>(
  obj: T,
  prop1: P1,
  prop2: P2,
  prop3: P3,
  prop4: P4
): string;

export function pathof<
  T,
  P1 extends keyof T,
  P2 extends keyof T[P1],
  P3 extends keyof T[P1][P2],
  P4 extends keyof T[P1][P2][P3],
  P5 extends keyof T[P1][P2][P3][P4]
>(obj: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5): string;

export function pathof<T>(obj: T, ...props: string[]): string {
  return props.join('.');
}
