import { Injectable } from '@angular/core';

@Injectable()
export class JsonConfig {
  readonly dateFormat: RegExp = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
  readonly interceptor: boolean = false;
}
