import { nameof } from 'ng-toolkit-lib';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface UuidObject {
    id: string;
}

export interface AsyncStateObject{
    isBusy: boolean;
    error: Error;
}

export interface Dataset<T> extends AsyncStateObject {
    items: T[];
}

export interface Detail<T> extends AsyncStateObject {
    item: T;
}

export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const db = {
    getItem: <T>(id: string) => {
        return of(JSON.parse(localStorage.getItem(id)) as T).pipe(delay(1500));
    },
    setItem: <T>(value: T) => {
        localStorage.setItem(value[nameof<UuidObject>('id')], JSON.stringify(value));
        return of(value).pipe(delay(1500));
    }
};