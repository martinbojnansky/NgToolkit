import { Component } from '@angular/core';
import { LocalizationService } from './localization/localization.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public localizationService: LocalizationService) {}
}
