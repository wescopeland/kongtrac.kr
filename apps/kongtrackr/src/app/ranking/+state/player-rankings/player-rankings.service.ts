import { Injectable } from '@angular/core';

import { PlayerRankingsDataService } from './player-rankings-data.service';
import { PlayerRankingsStore } from './player-rankings.store';
import { Player } from './models/player.model';
import { PlayerRanking } from './models/player-ranking.model';
import { RankingElement } from '../models/ranking-element.model';

@Injectable({ providedIn: 'root' })
export class PlayerRankingsService {
  constructor(
    private _dataService: PlayerRankingsDataService,
    private _store: PlayerRankingsStore
  ) {}

  assembleArcadeHighScoreList(allRankings: PlayerRanking[]): RankingElement[] {
    let arcadeRankingElements: RankingElement[] = [];
    allRankings.forEach(ranking => {
      let newRankingElement: RankingElement = {
        platform: 'arcade',
        name: ranking.name,
        playerId: ranking.id,
        score: ranking.currentArcadePbScore,
        date: ranking.currentArcadePbDate,
        id: ranking.currentArcadePbGameId
      };

      arcadeRankingElements.push(newRankingElement);
    });

    arcadeRankingElements = arcadeRankingElements
      .filter(el => el.score)
      .sort((a, b) => (a.score > b.score ? -1 : 1));

    return arcadeRankingElements;
  }

  assembleCombinedHighScoreList(
    allRankings: PlayerRanking[]
  ): RankingElement[] {
    let rankingElements: RankingElement[] = [];
    allRankings.forEach(ranking => {
      let currentPbDate = null;
      let currentPbGameId = null;
      let currentPbScore = null;
      let currentPbPlatform: 'arcade' | 'emulator';

      if (ranking.currentArcadePbScore && ranking.currentMamePbScore) {
        if (ranking.currentArcadePbScore > ranking.currentMamePbScore) {
          currentPbScore = ranking.currentArcadePbScore;
          currentPbDate = ranking.currentArcadePbDate;
          currentPbGameId = ranking.currentArcadePbGameId;
          currentPbPlatform = 'arcade';
        } else {
          currentPbScore = ranking.currentMamePbScore;
          currentPbDate = ranking.currentMamePbDate;
          currentPbGameId = ranking.currentMamePbGameId;
          currentPbPlatform = 'emulator';
        }
      } else if (ranking.currentArcadePbScore && !ranking.currentMamePbScore) {
        currentPbScore = ranking.currentArcadePbScore;
        currentPbDate = ranking.currentArcadePbDate;
        currentPbGameId = ranking.currentArcadePbGameId;
        currentPbPlatform = 'arcade';
      } else if (ranking.currentMamePbScore && !ranking.currentArcadePbScore) {
        currentPbScore = ranking.currentMamePbScore;
        currentPbDate = ranking.currentMamePbDate;
        currentPbGameId = ranking.currentMamePbGameId;
        currentPbPlatform = 'emulator';
      }

      let newRankingElement: RankingElement = {
        platform: currentPbPlatform,
        name: ranking.name,
        playerId: ranking.id,
        score: currentPbScore,
        date: currentPbDate,
        id: currentPbGameId
      };

      rankingElements.push(newRankingElement);
    });

    rankingElements = rankingElements.sort((a, b) =>
      a.score > b.score ? -1 : 1
    );

    return rankingElements;
  }

  assembleMameHighScoreList(allRankings: PlayerRanking[]): RankingElement[] {
    let mameRankingElements: RankingElement[] = [];
    allRankings.forEach(ranking => {
      let newRankingElement: RankingElement = {
        platform: 'arcade',
        name: ranking.name,
        playerId: ranking.id,
        score: ranking.currentMamePbScore,
        date: ranking.currentMamePbDate,
        id: ranking.currentMamePbGameId
      };

      mameRankingElements.push(newRankingElement);
    });

    mameRankingElements = mameRankingElements
      .filter(el => el.score)
      .sort((a, b) => (a.score > b.score ? -1 : 1));

    return mameRankingElements;
  }

  async getPlayers() {
    const response = await this._dataService.getPlayers().toPromise();

    const allRankings = this.convertPlayersToRankings(response);
    this._store.set(allRankings);

    return response;
  }

  convertPlayersToRankings(players: any): PlayerRanking[] {
    let rankings: PlayerRanking[] = [];

    for (let playerId in players) {
      let newRanking: PlayerRanking = {
        id: playerId,
        name: players[playerId].name,
        currentArcadePbDate: players[playerId].currentArcadePbDate
          ? players[playerId].currentArcadePbDate
          : null,
        currentArcadePbGameId: players[playerId].currentArcadePbGameId
          ? players[playerId].currentArcadePbGameId
          : null,
        currentArcadePbScore: players[playerId].currentArcadePbScore
          ? players[playerId].currentArcadePbScore
          : null,
        currentMamePbDate: players[playerId].currentMamePbDate
          ? players[playerId].currentMamePbDate
          : null,
        currentMamePbGameId: players[playerId].currentMamePbGameId
          ? players[playerId].currentMamePbGameId
          : null,
        currentMamePbScore: players[playerId].currentMamePbScore
          ? players[playerId].currentMamePbScore
          : null
      };

      rankings.push(newRanking);
    }

    console.log({ rankings });
    return rankings;
  }
}
