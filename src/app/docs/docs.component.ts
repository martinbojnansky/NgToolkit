import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
        {
          id: 'releaseNotes',
          label: `What's new?`,
          routerLink: 'release-notes',
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
    {
      id: 'translation',
      label: 'Translation',
      routerLink: 'translation',
      items: [
        {
          id: 'overview',
          label: 'Overview',
          routerLink: 'overview',
        },
      ],
    },
    {
      id: 'observableStore',
      label: 'Observable Store',
      routerLink: 'observable-store',
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

  constructor() {}

  ngOnInit(): void {}
}
