import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppStore } from './app-store';
import { AppComponent } from './app.component';
import { TranslationModule } from './translation/translation.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    TranslationModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [AppStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
