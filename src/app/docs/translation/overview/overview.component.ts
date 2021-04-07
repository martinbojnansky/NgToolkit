import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent implements OnInit {
  readonly snippets = {
    viewModelInit: `import { Injectable } from '@angular/core';
import { ViewModel } from 'ng-toolkit-lib';

@Injectable()
export class SamplesViewModel extends ViewModel {
  constructor() {
    super();
    this.init();
  }
}`,
    viewModelObservables: `@Injectable()
export class SamplesViewModel extends ViewModel {
  form = new FormGroup({
    text: new FormControl('FormControl Text'),
    bool: new FormControl(true),
    samples: new FormArray([new FormControl(), new FormControl()]),
  });

  text$ = new BehaviorSubject<string>('Observable Text');

  ...
}`,
    viewModelMethods: `@Injectable()
export class SamplesViewModel extends ViewModel {
  get formSamples(): FormArray {
    return this.form.get('samples') as FormArray;
  }

  ...

  addSample(): void {
    this.formSamples.push(new FormControl());
  }

  removeSample(index: number): void {
    this.formSamples.removeAt(index);
  }
}`,
    viewInit: `@Component({
  selector: 'app-samples-view',
  templateUrl: './samples-view.component.html',
  styleUrls: ['./samples-view.component.scss'],
  providers: [SamplesViewModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamplesViewComponent {
  constructor(public vm: SamplesViewModel) { }
}`,
    viewSubscription: `<ng-container *ngIf="vm.changes$ | async">
  ...
</ng-container>`,
    viewBindings: `<!-- FormControl binding -->
<input type="text" [formControl]="vm.form.get('text')" />

<!-- FormControl value binding -->
{{ form.get('text').value }}

<!-- Observable value binding -->
{{ text$.value }}

<!-- Observable value/change binding -->
<input type="text" [value]="vm.text$.value" (change)="vm.text$.next($event.target.value)" />

<!-- Method binding -->
<button class="btn btn-success" (click)="vm.addSample()">+ Add Sample</button>"`,
    parentViewModelInit: `@Injectable()
export class SampleDetailViewModel extends ViewModel {
  constructor(
    public samples: SamplesViewModel,
  ) {
    super();
    this.init(samples);
  }
}`,
    parentViewBinding: `<ng-container *ngIf="vm.changes$ | async">
  <input type="text" [formControl]="vm.samples.form.get('text')" />
</ng-container>`,
    mvvmModuleImport: `import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MvvmModule } from 'dist/ng-toolkit-lib';

@NgModule({
  declarations: [
    FormControlComponent,
    SampleDetailViewComponent,
    SamplesViewComponent,
  ],
  imports: [
    CommonModule,
    MvvmSampleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MvvmModule,
  ],
  providers: [SampleService],
})
export class MvvmSampleModule { }`,
    viewModelContextDirectiveProvider: `<div *ngFor="let sample of vm.formSamples.controls; let i = index">
  <div [vmContext]="{ index: i }">
    <app-sample-detail-view class="card-body"></app-sample-detail-view>
  </div>
</div>`,
    viewModelContextDirectiveInjector: `constructor(
  public samples: SamplesViewModel,
  @Optional()
  @Inject(ViewModelContextDirective)
  public context: ViewModelContext<{ index: number }>
) {
  super();
  this.init(samples);
}`,
    viewModelContextDirectiveBinding: `<button (click)="vm.samples.removeSample(vm.context.value.index)">
  Remove
</button>`,
  };

  constructor() {}

  ngOnInit(): void {}
}
