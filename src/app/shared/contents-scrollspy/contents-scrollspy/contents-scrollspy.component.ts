import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-contents-scrollspy',
  templateUrl: './contents-scrollspy.component.html',
  styleUrls: ['./contents-scrollspy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentsScrollspyComponent implements OnInit, AfterViewInit {
  @ViewChild('contentSection')
  contentSection: ElementRef<HTMLDivElement>;

  tableOfContents: { id: string; label: string }[] = [];

  urlAfterRedirects: string;

  constructor(protected cd: ChangeDetectorRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.updateTableOfContents();
  }

  getLinkToFragment(fragment: string): string {
    return `${window.location.pathname}#${fragment}`;
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
