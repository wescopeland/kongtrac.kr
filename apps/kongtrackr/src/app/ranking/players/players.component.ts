import { Component, Input, OnInit } from '@angular/core';

import { RankingElement } from '../+state/models/ranking-element.model';

@Component({
  selector: 'kongtrac-ranking-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class RankingPlayersComponent implements OnInit {
  @Input() trimmedArcadeHighScoreList: RankingElement[];
  @Input() trimmedCompleteHighScoreList: RankingElement[];
  @Input() trimmedMameHighScoreList: RankingElement[];

  public isShowingSeparatePlatforms = false;

  constructor() {}

  ngOnInit() {}

  onShowSeparatePlatformsClick(): void {
    this.isShowingSeparatePlatforms = !this.isShowingSeparatePlatforms;
  }
}
