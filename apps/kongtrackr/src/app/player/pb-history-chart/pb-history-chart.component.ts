import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Chart } from 'angular-highcharts';
import { SeriesLineOptions } from 'highcharts';

import { ShortNumberPipe } from '../../shared/short-number.pipe';

@Component({
  selector: 'kongtrac-pb-history-chart',
  templateUrl: './pb-history-chart.component.html',
  styleUrls: ['./pb-history-chart.component.scss']
})
export class PbHistoryChartComponent implements OnChanges, OnInit {
  @Input() pbHistorySeries: SeriesLineOptions;

  public chart: Chart;

  constructor(
    private _datePipe: DatePipe,
    private _decimalPipe: DecimalPipe,
    private _shortNumberPipe: ShortNumberPipe
  ) {}

  ngOnChanges() {
    if (this.pbHistorySeries) {
      this.chart = this.buildChart();
      this.chart.removeSeries(0);
      this.chart.addSeries(this.pbHistorySeries, true, false);
    }
  }

  ngOnInit() {}

  buildChart(): Chart {
    let that = this;

    return new Chart({
      chart: {
        type: 'line',
        zoomType: 'x',
        resetZoomButton: {
          position: {
            align: 'left'
          }
        }
      },
      title: {
        text: 'Personal best history'
      },
      subtitle: {
        text: 'Click and drag to zoom'
      },
      xAxis: {
        title: {
          text: 'Date'
        },
        type: 'datetime',
        labels: {
          formatter: function() {
            return `${that._datePipe.transform(this.value, 'MMM yyyy')}`;
          }
        },
        plotLines: []
      },
      yAxis: {
        title: {
          text: 'Score'
        },
        labels: {
          formatter: function() {
            return `${that._shortNumberPipe.transform(this.value)}`;
          }
        },
        min: 0,
        max: 1300000,
        tickInterval: 260000
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
            symbol: 'circle'
          }
        }
      },
      tooltip: {
        formatter: function() {
          return `
            <b>
              ${that._datePipe.transform(this.x, 'mediumDate')}
            </b> 
            – 
            ${that._decimalPipe.transform(this.y)}
          `;
        }
      },
      exporting: {
        enabled: true,
        sourceWidth: 1300,
        sourceHeight: 600,
        scale: 1,
        chartOptions: {
          subtitle: null
        }
      },
      credits: { enabled: false },
      series: []
    });
  }
}
