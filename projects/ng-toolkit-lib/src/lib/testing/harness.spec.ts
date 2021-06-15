import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Harness } from './harness';

@Component({
  template: `
    <div>
      <p data-tid="prop1">{{ prop1 }}</p>
    </div>
  `,
})
class HarnessTestComponent {
  @Input()
  prop1: string;
}

describe('Harness', () => {
  let harness: Harness<HarnessTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    harness = new Harness<HarnessTestComponent>(
      (): ComponentFixture<HarnessTestComponent> =>
        TestBed.createComponent(HarnessTestComponent)
    );
  });

  it('should create', async () => {
    await harness.create();
    expect(
      (harness.el.querySelector('[data-tid=prop1]') as HTMLParagraphElement)
        .innerText
    ).toBeFalsy();
  });

  it('should create and set properties', async () => {
    await harness.create({
      prop1: 'property 1',
    });
    expect(
      (harness.el.querySelector('[data-tid=prop1]') as HTMLParagraphElement)
        .innerText
    ).toBe('property 1');
  });
});
