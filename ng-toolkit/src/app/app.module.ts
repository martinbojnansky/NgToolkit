import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Store } from './store';
import { NgToolkitLibModule } from 'ng-toolkit-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgToolkitLibModule],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
