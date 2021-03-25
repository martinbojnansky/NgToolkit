import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent implements OnInit {
  @Input()
  label: string;

  @Input()
  control: AbstractControl;

  @ContentChild('contentTemplate')
  contentTemplate: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}
}
