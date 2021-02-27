import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppStore } from './app-store';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, CoreModule, AppRoutingModule],
  providers: [AppStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
