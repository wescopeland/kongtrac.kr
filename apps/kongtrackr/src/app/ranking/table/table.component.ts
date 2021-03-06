import { Component, Input, OnInit } from '@angular/core';

import { RankingElement } from '../+state/models/ranking-element.model';

@Component({
  selector: 'kongtrac-ranking-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class RankingTableComponent implements OnInit {
  @Input() rankingElements: RankingElement[];
  public displayedColumns: string[] = [
    'rank',
    'platform',
    'name',
    'score',
    'date'
  ];

  constructor() {}

  ngOnInit() {}
}
