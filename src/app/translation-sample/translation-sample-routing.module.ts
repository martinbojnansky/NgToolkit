import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslationSampleComponent } from './components/translation-sample/translation-sample.component';

const routes: Routes = [{ path: '', component: TranslationSampleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslationSampleRoutingModule {}
