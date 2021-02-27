export function trySafe<T>(fce: () => T, failResult: T = null): T {
  try {
    const result = fce();
    return result ? result : null;
  } catch {
    return failResult;
  }
}
