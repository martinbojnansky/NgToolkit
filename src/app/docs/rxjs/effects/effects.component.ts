import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-effects',
  templateUrl: './effects.component.html',
  styleUrls: ['./effects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EffectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
