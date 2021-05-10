import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { JsonConfig } from './json-config';
import { JsonDeserializerInterceptor } from './json-deserializer.interceptor';
import { JsonService } from './json.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class JsonModule {
  static forRoot(
    config?: Partial<JsonConfig>
  ): ModuleWithProviders<JsonModule> {
    const newConfig = {
      ...new JsonConfig(),
      ...config,
    };

    return {
      ngModule: JsonModule,
      providers: [
        {
          provide: JsonConfig,
          useValue: newConfig,
        },
        JsonService,
        ...(newConfig.interceptor
          ? [
              {
                provide: HTTP_INTERCEPTORS,
                useClass: JsonDeserializerInterceptor,
                multi: true,
              },
            ]
          : []),
      ],
    };
  }
}
