import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppQueries } from './app-queries';
import { AppRoutingModule } from './app-routing.module';
import { AppStore } from './app-store';
import { AppComponent } from './app.component';
import { actions } from './store/actions';
import { Store } from './store/store';
import { TranslationModule } from './translation/translation.module';

const getReducerProviders = () => {
  return Object.keys(actions).map((k) => actions[k].reducerType);
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    TranslationModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [AppStore, AppQueries, Store, ...getReducerProviders()],
  bootstrap: [AppComponent],
})
export class AppModule {}
