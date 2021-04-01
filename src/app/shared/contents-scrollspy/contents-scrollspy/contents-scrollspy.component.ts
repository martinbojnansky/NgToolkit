import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-contents-scrollspy',
  templateUrl: './contents-scrollspy.component.html',
  styleUrls: ['./contents-scrollspy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentsScrollspyComponent implements AfterViewInit {
  @ViewChild('contentSection')
  contentSection: ElementRef<HTMLDivElement>;

  tableOfContents: { id: string; label: string }[] = [];

  constructor(protected cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.updateTableOfContents();
  }

  protected updateTableOfContents() {
    this.tableOfContents.push(
      ...Array.from(
        this.contentSection.nativeElement.querySelectorAll('*[id]')
      ).map((e) => ({
        id: e.getAttribute('id'),
        label: e.getAttribute('aria-label'),
      }))
    );
    this.cd.detectChanges();
  }
}
