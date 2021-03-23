import { Injectable } from '@angular/core';
import { Property, ViewModel } from 'dist/ng-toolkit-lib';

@Injectable()
export class SamplesViewModel extends ViewModel {
  @Property()
  editable = false;
}
