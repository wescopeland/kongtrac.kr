import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/angular';
import { Observable, combineLatest } from 'rxjs';

import { DbStatsQuery, DbStatsService } from '../+state/db-stats';
import {
  PersonalBestsArcadeQuery,
  PersonalBestsArcadeService
} from '../+state/personal-bests-arcade';
import {
  PersonalBestsMameQuery,
  PersonalBestsMameService
} from '../+state/personal-bests-mame';
import { DbStatsState } from '../+state/models/db-stats-state.model';
import { PersonalBest } from '../+state/models/personal-best.model';
import { RankingElement } from '../+state/models/ranking-element.model';
import { Game } from '../+state/models/game.model';
import {
  TopCombinedGamesQuery,
  TopCombinedGamesService
} from '../+state/top-combined-games';
import {
  TopArcadeGamesQuery,
  TopArcadeGamesService
} from '../+state/top-arcade-games';
import {
  TopMameGamesQuery,
  TopMameGamesService
} from '../+state/top-mame-games';

@Component({
  selector: 'kongtrac-ranking-shell',
  templateUrl: './ranking-shell.component.html',
  styleUrls: ['./ranking-shell.component.scss']
})
export class RankingShellComponent implements OnInit {
  public arcadePersonalBests$: Observable<PersonalBest[]>;
  public mamePersonalBests$: Observable<PersonalBest[]>;
  public state$: Observable<DbStatsState>;
  public completeArcadeHighScoreList: RankingElement[];
  public completeCombinedHighScoreList: RankingElement[];
  public completeMameHighScoreList: RankingElement[];
  public trimmedArcadeHighScoreList: RankingElement[];
  public trimmedCompleteHighScoreList: RankingElement[];
  public trimmedMameHighScoreList: RankingElement[];
  public topCombinedGames: RankingElement[];
  public topArcadeGames: RankingElement[];
  public topMameGames: RankingElement[];
  public currentRoute: 'players' | 'complete' | 'games';

  constructor(
    private _stateService: StateService,
    private _dbStatsQuery: DbStatsQuery,
    private _dbStatsService: DbStatsService,
    private _personalBestsArcadeQuery: PersonalBestsArcadeQuery,
    private _personalBestsArcadeService: PersonalBestsArcadeService,
    private _personalBestsMameQuery: PersonalBestsMameQuery,
    private _personalBestsMameService: PersonalBestsMameService,
    private _topCombinedGamesQuery: TopCombinedGamesQuery,
    private _topCombinedGamesService: TopCombinedGamesService,
    private _topArcadeGamesQuery: TopArcadeGamesQuery,
    private _topArcadeGamesService: TopArcadeGamesService,
    private _topMameGamesQuery: TopMameGamesQuery,
    private _topMameGamesService: TopMameGamesService
  ) {}

  ngOnInit() {
    this.currentRoute = this.determineCurrentRoute(
      this._stateService.current.data
    );

    this.state$ = this._dbStatsQuery.select();

    this._dbStatsService.getDbStats();
    this._topCombinedGamesService.getTopCombinedGames();

    if (this.currentRoute === 'games') {
      combineLatest(
        this._topCombinedGamesService.getTopCombinedGames(),
        this._topArcadeGamesService.getTopArcadeGames(),
        this._topMameGamesService.getTopMameGames()
      ).subscribe(() => {
        this.buildTopGames(
          this._topCombinedGamesQuery.getAll(),
          this._topArcadeGamesQuery.getAll(),
          this._topMameGamesQuery.getAll()
        );
      });
    }

    if (this.currentRoute === 'players' || this.currentRoute === 'complete') {
      combineLatest(
        this._personalBestsArcadeService.getPersonalBestsArcade(),
        this._personalBestsMameService.getPersonalBestsMame()
      ).subscribe(() => {
        this.buildLeaderboards(
          this._personalBestsArcadeQuery.getAll(),
          this._personalBestsMameQuery.getAll()
        );

        this.trimmedCompleteHighScoreList = this.completeCombinedHighScoreList.slice(
          0,
          10
        );
      });
    }
  }

  determineCurrentRoute(routeData: any): 'players' | 'complete' | 'games' {
    let route = null;

    if (routeData.players) {
      route = 'players';
    } else if (routeData.complete) {
      route = 'complete';
    } else if (routeData.games) {
      route = 'games';
    }

    return route;
  }

  getHighestScoreFromPlayer(
    rankingElements: RankingElement[]
  ): RankingElement[] {
    let highest: RankingElement[] = rankingElements;

    // We have elements from multiple platforms in our one array.
    // Find each individual player's highest score from whichever platform,
    // deleting the record of the other platform that aren't interested in.
    for (let i = 0; i < highest.length; i += 1) {
      let currentPlayer = highest[i].name;
      let currentGameId = highest[i].id;

      for (let j = 0; j < highest.length; j += 1) {
        if (
          highest[j].name === currentPlayer &&
          highest[j].id !== currentGameId
        ) {
          if (highest[i].score > highest[j].score) {
            highest.splice(j, 1);
          } else {
            highest.splice(i, 1);
          }
        }
      }
    }

    return highest;
  }

  buildTopGames(combinedGames: Game[], arcadeGames: Game[], mameGames: Game[]) {
    let sanitizedCombined: RankingElement[] = [];
    let sanitizedArcade: RankingElement[] = [];
    let sanitizedMame: RankingElement[] = [];

    // TODO: Refactor all of the below into a sanitization function
    combinedGames.sort((a, b) => (b.score > a.score ? 1 : -1));
    arcadeGames.sort((a, b) => (b.score > a.score ? 1 : -1));
    mameGames.sort((a, b) => (b.score > a.score ? 1 : -1));

    combinedGames.forEach(game => {
      let sanitizedPlatform = null;

      if (game.platform === 'Arcade') {
        sanitizedPlatform = 'arcade';
      } else {
        sanitizedPlatform = 'emulator';
      }

      sanitizedCombined.push({
        name: game.player,
        score: game.score,
        date: game.date,
        platform: sanitizedPlatform,
        id: game.gameId
      });
    });

    arcadeGames.forEach(game => {
      sanitizedArcade.push({
        name: game.player,
        score: game.score,
        date: game.date,
        platform: 'arcade',
        id: game.gameId
      });
    });

    mameGames.forEach(game => {
      sanitizedMame.push({
        name: game.player,
        score: game.score,
        date: game.date,
        platform: 'emulator',
        id: game.gameId
      });
    });

    this.topArcadeGames = sanitizedArcade;
    this.topCombinedGames = sanitizedCombined;
    this.topMameGames = sanitizedMame;
  }

  buildLeaderboards(
    personalBestsArcade: PersonalBest[],
    personalBestsMame: PersonalBest[]
  ): void {
    let sanitizedArcade: RankingElement[] = [];
    let sanitizedMame: RankingElement[] = [];

    personalBestsArcade.sort((a, b) => (b.score > a.score ? 1 : -1));
    personalBestsMame.sort((a, b) => (b.score > a.score ? 1 : -1));

    personalBestsArcade.forEach(pb => {
      if (pb.score > 0) {
        sanitizedArcade.push({
          name: pb.playerName,
          score: pb.score,
          date: pb.date,
          platform: 'arcade',
          id: pb.id
        });
      }
    });

    this.completeArcadeHighScoreList = sanitizedArcade.sort((a, b) =>
      a.score < b.score ? 1 : -1
    );

    this.trimmedArcadeHighScoreList = this.completeArcadeHighScoreList.slice(
      0,
      10
    );

    personalBestsMame.forEach(pb => {
      if (pb.score > 0) {
        sanitizedMame.push({
          name: pb.playerName,
          score: pb.score,
          date: pb.date,
          platform: 'emulator',
          id: pb.id
        });
      }
    });

    this.completeMameHighScoreList = sanitizedMame.sort((a, b) =>
      a.score < b.score ? 1 : -1
    );

    this.trimmedMameHighScoreList = this.completeMameHighScoreList.slice(0, 10);

    let sanitizedScores = this.getHighestScoreFromPlayer([
      ...sanitizedArcade,
      ...sanitizedMame
    ]).sort((a, b) => (a.score < b.score ? 1 : -1));

    this.completeCombinedHighScoreList = sanitizedScores;
  }
}
