import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalizationModule } from './localization/localization.module';
import { Store } from './store';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LocalizationModule],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
