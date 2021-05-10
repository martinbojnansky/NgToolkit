import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonService } from './json.service';

@Injectable()
export class JsonDeserializerInterceptor implements HttpInterceptor {
  constructor(protected jsonService: JsonService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.responseType !== 'json') {
      return next.handle(request);
    }

    // Default JSON serialization is not able to parse Date object from string,
    // therefore we need to apply custom deserialization.
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body) {
          event = event.clone({
            body: this.jsonService.deserialize(
              this.jsonService.serialize(event.body)
            ),
          });
        }

        return event;
      })
    );
  }
}
