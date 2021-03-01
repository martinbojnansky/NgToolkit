import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslationModule } from 'src/app/translation/translation.module';
import { AppQueries } from './app-queries';
import { AppRoutingModule } from './app-routing.module';
import { AppStore } from './app-store';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    TranslationModule,
  ],
  providers: [AppStore, AppQueries],
  bootstrap: [AppComponent],
})
export class AppModule {}
