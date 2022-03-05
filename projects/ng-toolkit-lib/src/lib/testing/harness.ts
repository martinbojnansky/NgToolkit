import { ComponentFixture } from '@angular/core/testing';

export type HarnessProps<T> = Partial<{
  [TKey in keyof T]: T[TKey];
}>;

export class Harness<T> {
  protected _fixture: ComponentFixture<T>;
  protected _component: T;
  protected _el: HTMLElement;

  constructor(protected componentFactory: () => ComponentFixture<T>) {}

  get fixture(): ComponentFixture<T> {
    return this._fixture;
  }

  get component(): T {
    return this._component;
  }

  get el(): HTMLElement {
    return this._el;
  }

  async create(props?: HarnessProps<T>): Promise<void> {
    this._fixture = this.componentFactory();
    this._component = this._fixture.componentInstance;

    if (props) {
      Object.keys(props)?.forEach((key) => {
        this._component[key as keyof T] = props[key as keyof T];
      });
    }

    this._fixture.detectChanges();
    await this._fixture.whenStable();

    this._el = this._fixture.nativeElement;
  }

  detectChanges(checkNoChanges?: boolean): void {
    this._fixture.detectChanges(checkNoChanges);
  }

  whenStable(): Promise<void> {
    return this._fixture.whenStable();
  }
}
