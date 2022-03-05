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
      id: 'helpers',
      label: 'Helpers',
      routerLink: 'helpers',
      items: [
        {
          id: 'nameof',
          label: 'NameOf',
          routerLink: 'nameof',
        },
        {
          id: 'trysafe',
          label: 'TrySafe',
          routerLink: 'trysafe',
        },
        {
          id: 'uuid',
          label: 'UUID',
          routerLink: 'uuid',
        },
      ],
    },
    {
      id: 'json',
      label: 'Json',
      routerLink: 'json',
      items: [
        {
          id: 'overview',
          label: 'Overview',
          routerLink: 'overview',
        },
      ],
    },
    {
      id: 'rxjs',
      label: 'RxJs',
      routerLink: 'rxjs',
      items: [
        {
          id: 'observable-unsubscriber',
          label: 'ObservableUnsubscriber',
          routerLink: 'observable-unsubscriber',
        },
        {
          id: 'effects',
          label: 'Effects',
          routerLink: 'effects',
        },
      ],
    },
    {
      id: 'storage',
      label: 'Storage',
      routerLink: 'storage',
      items: [
        {
          id: 'overview',
          label: 'Overview',
          routerLink: 'overview',
        },
      ],
    },
    {
      id: 'testing',
      label: 'Testing',
      routerLink: 'testing',
      items: [
        {
          id: 'harness',
          label: 'Harness',
          routerLink: 'harness',
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
  ];

  @ViewChild('docsAccordion')
  docsAccordion: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit(): void {}
}
