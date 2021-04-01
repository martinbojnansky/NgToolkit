import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent implements OnInit {
  readonly docsNavGroups = [
    {
      id: 'gettingStarted',
      label: 'Getting started',
      routerLink: 'getting-started',
      items: [
        {
          id: 'introduction',
          label: 'Introduction',
          routerLink: 'introduction',
        },
      ],
    },
    {
      id: 'mvvmStarted',
      label: 'MVVM',
      routerLink: 'mvvm',
      items: [
        {
          id: 'overview',
          label: 'Overview',
          routerLink: 'overview',
        },
      ],
    },
  ];

  @ViewChild('docsAccordion')
  docsAccordion: ElementRef<HTMLDivElement>;

  constructor(protected router: Router) {}

  ngOnInit(): void {
    // this.router.events.subscribe((e) => {
    //   if (e instanceof NavigationEnd) {
    //     e.urlAfterRedirects.startsWith(`/${this.docsNavGroups[0].routerLink}/`);
    //   }
    // });
  }
}
