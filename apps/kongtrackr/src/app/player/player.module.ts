import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as exporting from 'highcharts/modules/exporting.src';

import { SharedModule } from '../shared/shared.module';
import { PbHistoryChartComponent } from './pb-history-chart/pb-history-chart.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    ChartModule,
    SharedModule
  ],
  declarations: [PbHistoryChartComponent, PlayerDetailsComponent],
  providers: [
    DatePipe,
    DecimalPipe,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [exporting] }
  ],
  entryComponents: [PbHistoryChartComponent, PlayerDetailsComponent]
})
export class PlayerModule {}
