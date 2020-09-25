import { OperatorFunction } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export function effect<T>(
  completed?: (value: T) => void,
  failed?: (error: any) => void
): OperatorFunction<T, void> {
  return (observable$) =>
    observable$.pipe(
      tap(completed, failed),
      map((_) => {})
    );
}
