import { Component, Input, OnInit } from '@angular/core';

import { RankingElement } from '../+state/models/ranking-element.model';

@Component({
  selector: 'kongtrac-ranking-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class RankingGamesComponent implements OnInit {
  @Input() topArcadeGames: RankingElement[];
  @Input() topCombinedGames: RankingElement[];
  @Input() topMameGames: RankingElement[];

  public isShowingSeparatePlatforms = false;
  public maxDisplay = 10;

  constructor() {}

  ngOnInit() {}

  onShowSeparatePlatformsClick(): void {
    this.isShowingSeparatePlatforms = !this.isShowingSeparatePlatforms;
  }

  onShowTopFiftyClick(): void {
    if (this.maxDisplay === 10) {
      this.maxDisplay = 50;
    } else {
      this.maxDisplay = 10;
    }
  }
}
