import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {
  UIRouterUpgradeModule,
  NgHybridStatesModule
} from '@uirouter/angular-hybrid';

import { RankingShellComponent } from './+shell/ranking-shell.component';
import { RankingCompleteComponent } from './complete/complete.component';
import { RankingGamesComponent } from './games/games.component';
import { RankingPlayersComponent } from './players/players.component';
import { TrackingMetricsComponent } from './tracking-metrics/tracking-metrics.component';
import { RankingTableComponent } from './table/table.component';

const routes: NgHybridStatesModule = {
  states: [
    {
      name: 'ranking-players',
      url: '/ranking/players',
      component: RankingShellComponent,
      data: { players: true }
    },
    {
      name: 'ranking-complete',
      url: '/ranking/complete',
      component: RankingShellComponent,
      data: { complete: true }
    },
    {
      name: 'ranking-games',
      url: '/ranking/games',
      component: RankingShellComponent,
      data: { games: true }
    }
  ]
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    UIRouterUpgradeModule.forChild(routes)
  ],
  declarations: [
    RankingShellComponent,
    RankingCompleteComponent,
    RankingGamesComponent,
    RankingPlayersComponent,
    TrackingMetricsComponent,
    RankingTableComponent
  ],
  exports: [
    RankingShellComponent,
    TrackingMetricsComponent,
    RankingTableComponent
  ],
  entryComponents: [
    RankingShellComponent,
    TrackingMetricsComponent,
    RankingTableComponent
  ]
})
export class RankingModule {}
