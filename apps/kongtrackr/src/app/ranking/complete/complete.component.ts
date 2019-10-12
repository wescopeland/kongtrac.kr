import { Component, Input, OnInit } from '@angular/core';

import { RankingElement } from '../+state/models/ranking-element.model';

@Component({
  selector: 'kongtrac-ranking-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class RankingCompleteComponent implements OnInit {
  @Input() completeArcadeHighScoreList: RankingElement[];
  @Input() completeCombinedHighScoreList: RankingElement[];
  @Input() completedMameHighScoreList: RankingElement[];

  public isShowingSeparatePlatforms = false;

  constructor() {}

  ngOnInit() {}

  onShowSeparatePlatformsClick(): void {
    this.isShowingSeparatePlatforms = !this.isShowingSeparatePlatforms;
  }
}
