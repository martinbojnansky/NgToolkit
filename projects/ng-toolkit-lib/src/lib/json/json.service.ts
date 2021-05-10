import { Injectable } from '@angular/core';
import { JsonConfig } from './json-config';

@Injectable()
export class JsonService {
  constructor(protected config: JsonConfig) {}

  deepClone<T>(obj: T): T {
    return this.deserialize(JSON.stringify(obj));
  }

  serialize<T>(obj: T): string {
    return JSON.stringify(obj);
  }

  deserialize<T>(json: string): T {
    return JSON.parse(json, (key, value) => this.reviver(key, value)) as T;
  }

  protected reviver(key: any, value: any): any {
    const dateFormat = this.config.dateFormat;
    if (typeof value === 'string' && dateFormat.exec(value)) {
      return new Date(value);
    }
    return value;
  }
}
