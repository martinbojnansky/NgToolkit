import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgToolkitLibModule } from 'ng-toolkit-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgToolkitLibModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
