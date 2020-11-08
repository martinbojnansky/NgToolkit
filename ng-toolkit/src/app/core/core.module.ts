import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService, ApiServiceFakeImpl } from './services/api.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    // HttpClientModule,
  ],
  providers: [
    {
      provide: ApiService,
      useClass: ApiServiceFakeImpl,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
