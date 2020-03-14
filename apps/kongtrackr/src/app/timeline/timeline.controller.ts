import * as Highcharts from 'highcharts';
import * as moment from 'moment';

/* @ngInject */
export function TimelineController($filter, timelineService) {
  var vm = this;

  // Public Variables
  vm.arcadeWRChartConfig = {};
  vm.arcadeWRTimeline = [];
  vm.arcadeWRPlayerCount = 0;
  vm.daysSinceData = [];
  vm.mameWRChartConfig = {};
  vm.mameWRTimeline = [];
  vm.mameWRPlayerCount = 0;
  vm.combinedWRChartConfig = {};
  vm.combinedWRTimeline = [];
  vm.combinedWRPlayerCount = 0;
  vm.ksHistogramConfig = {};
  vm.ksTimeline = [];
  vm.onemillionHistogramConfig = {};
  vm.onemillionTimeline = [];
  vm.oneonemillionHistogramConfig = {};
  vm.oneonemillionTimeline = [];
  vm.onetwomillionHistogramConfig = {};
  vm.onetwomillionTimeline = [];

  // Public Functions
  vm.camelize = camelize;

  activate();

  ////////////////

  function abbreviateNumber() {
    var number = this.value;
    var decPlaces = 2;

    number = Number(number);

    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);

    // Enumerate number abbreviations
    var abbrev = ['k', 'm', 'b', 't'];

    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3);

      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        number = Math.round((number * decPlaces) / size) / decPlaces;

        // Handle special case where we round up to the next abbreviation
        if (number == 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }

        // Add the letter for the abbreviation
        number += abbrev[i];

        // We are done... stop
        break;
      }
    }

    return number;
  }

  function activate() {
    vm.arcadeWRChartConfig = {
      options: {
        chart: {
          type: 'line',
          zoomType: 'x'
        },
        title: {
          text: 'Donkey Kong Arcade World Record Timeline'
        },
        tooltip: {
          formatter: function() {
            return (
              '<b>' +
              this.point.holder.split(' ')[
                this.point.holder.split(' ').length - 1
              ] +
              ', ' +
              $filter('amDateFormat')(this.x, 'MMM YY') +
              '</b>: ' +
              $filter('number')(this.y)
            );
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
        }
      },
      series: [],
      credits: {
        enabled: false
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
            return Highcharts.dateFormat("%b '%y", this.value);
          }
        },
        plotLines: []
      },
      yAxis: {
        title: {
          text: 'Score'
        },
        labels: {
          formatter: abbreviateNumber
        },
        min: 850000,
        max: 1300000,
        tickInterval: 50000
      },
      plotOptions: {
        marker: {
          enabled: true,
          symbol: 'circle'
        }
      },
      exporting: {
        enabled: true
      }
    };

    vm.mameWRChartConfig = {
      options: {
        chart: {
          type: 'line',
          zoomType: 'x'
        },
        title: {
          text: 'Donkey Kong MAME World Record Timeline'
        },
        tooltip: {
          formatter: function() {
            return (
              '<b>' +
              this.point.holder.split(' ')[
                this.point.holder.split(' ').length - 1
              ] +
              ', ' +
              $filter('amDateFormat')(this.x, 'MMM YY') +
              '</b>: ' +
              $filter('number')(this.y)
            );
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
        }
      },
      series: [],
      credits: {
        enabled: false
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
            return Highcharts.dateFormat("%b '%y", this.value);
          }
        },
        plotLines: []
      },
      yAxis: {
        title: {
          text: 'Score'
        },
        labels: {
          formatter: abbreviateNumber
        },
        min: 850000,
        max: 1300000,
        tickInterval: 50000
      },
      plotOptions: {
        marker: {
          enabled: true,
          symbol: 'circle'
        }
      },
      exporting: {
        enabled: true
      }
    };

    vm.combinedWRChartConfig = {
      options: {
        chart: {
          type: 'line',
          zoomType: 'x'
        },
        title: {
          text: 'Donkey Kong Combined World Record Timeline'
        },
        tooltip: {
          formatter: function() {
            return (
              '<b>' +
              this.point.holder.split(' ')[
                this.point.holder.split(' ').length - 1
              ] +
              ', ' +
              $filter('amDateFormat')(this.x, 'MMM YY') +
              '</b>: ' +
              $filter('number')(this.y)
            );
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
        }
      },
      series: [],
      credits: {
        enabled: false
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
            return Highcharts.dateFormat("%b '%y", this.value);
          }
        },
        plotLines: []
      },
      yAxis: {
        title: {
          text: 'Score'
        },
        labels: {
          formatter: abbreviateNumber
        },
        min: 850000,
        max: 1300000,
        tickInterval: 50000
      },
      plotOptions: {
        marker: {
          enabled: true,
          symbol: 'circle'
        }
      },
      exporting: {
        enabled: true
      }
    };

    vm.ksHistogramConfig = {
      options: {
        chart: {
          type: 'column',
          zoomType: 'x'
        },
        title: {
          text: 'Killscreener Histogram'
        },
        subtitle: {
          text: 'Click and drag to zoom'
        },
        exporting: {
          enabled: true,
          sourceWidth: 1300,
          sourceHeight: 600,
          scale: 1,
          chartOptions: {
            subtitle: null
          }
        }
      },
      series: [],
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: 'Ranges'
        },
        categories: [
          'Pre-2000',
          '2000',
          '2001',
          '2002',
          '2003',
          '2004',
          '2005',
          '2006',
          '2007',
          '2008',
          '2009',
          '2010',
          '2011',
          '2012',
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018',
          '2019',
          '2020'
        ],
        crosshair: true
      },
      yAxis: {
        title: {
          text: 'Count'
        },
        allowDecimals: false
      },
      exporting: {
        enabled: true
      }
    };

    vm.millionHistogramConfig = {
      options: {
        chart: {
          type: 'column',
          zoomType: 'x'
        },
        title: {
          text: 'Million-point Histogram'
        },
        subtitle: {
          text: 'Click and drag to zoom'
        },
        exporting: {
          enabled: true,
          sourceWidth: 1300,
          sourceHeight: 600,
          scale: 1,
          chartOptions: {
            subtitle: null
          }
        }
      },
      series: [],
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: 'Ranges'
        },
        categories: [
          '2004',
          '2005',
          '2006',
          '2007',
          '2008',
          '2009',
          '2010',
          '2011',
          '2012',
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018',
          '2019',
          '2020'
        ],
        crosshair: true
      },
      yAxis: {
        title: {
          text: 'Count'
        },
        allowDecimals: false
      },
      exporting: {
        enabled: true
      }
    };

    vm.millionHundredHistogramConfig = {
      options: {
        chart: {
          type: 'column',
          zoomType: 'x'
        },
        title: {
          text: '1.1m-point Histogram'
        },
        subtitle: {
          text: 'Click and drag to zoom'
        },
        exporting: {
          enabled: true,
          sourceWidth: 1300,
          sourceHeight: 600,
          scale: 1,
          chartOptions: {
            subtitle: null
          }
        }
      },
      series: [],
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: 'Ranges'
        },
        categories: [
          '2010',
          '2011',
          '2012',
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018',
          '2019',
          '2020'
        ],
        crosshair: true
      },
      yAxis: {
        title: {
          text: 'Count'
        },
        allowDecimals: false
      },
      exporting: {
        enabled: true
      }
    };

    timelineService
      .getTimelineData('arcadeWRTimeline')
      .then(function then(response) {
        vm.arcadeWRTimeline = response;

        var chartSymbols = {
          hankChien: {
            color: '#2ecc40'
          },

          billyMitchell: {
            color: '#ff4136'
          },

          steveWiebe: {
            color: '#0074d9'
          },

          timSczerby: {
            color: '#aaaaaa'
          },

          robbieLakeman: {
            color: '#ff851b'
          },

          wesCopeland: {
            color: '#b10dc9'
          }
        };

        var trackedPlayers = [];
        var chartData = [];
        vm.arcadeWRTimeline.forEach(function(wr) {
          if (trackedPlayers.indexOf(wr.player) === -1) {
            vm.arcadeWRPlayerCount += 1;
            trackedPlayers.push(wr.player);
          }

          var chartDataObject = {
            x: moment(wr.date)
              .utc()
              .valueOf(),
            y: wr.score,
            holder: wr.player
          } as any;

          if (chartSymbols[camelize(wr.player)]) {
            chartDataObject.marker = {
              fillColor: chartSymbols[camelize(wr.player)].color,
              radius: 4
            };
          }

          chartData.push(chartDataObject);
        });

        vm.arcadeWRChartConfig.series.push({
          data: chartData,
          name: 'DK Arcade WR',
          color: '#000000',
          lineWidth: 3,
          borderWidth: 0,
          marker: {
            enabled: true
          }
        });
      });

    timelineService
      .getTimelineData('mameWRTimeline')
      .then(function then(response) {
        console.log('response', response);

        vm.mameWRTimeline = response;

        var chartSymbols = {
          neilChapman: {
            color: '#4fc3f7'
          },

          rickFothergill: {
            color: '#afb42b'
          },

          deanSaglio: {
            color: '#001f3f'
          },

          benJosWalbeehm: {
            color: '#ff8a65'
          },

          rossBenziger: {
            color: '#39cccc'
          },

          scottKessler: {
            color: '#7986cb'
          }
        };

        var trackedPlayers = [];
        var chartData = [];
        vm.mameWRTimeline.forEach(function(wr) {
          if (trackedPlayers.indexOf(wr.player) === -1) {
            vm.mameWRPlayerCount += 1;
            trackedPlayers.push(wr.player);
          }

          var chartDataObject = {
            x: moment(wr.date)
              .utc()
              .valueOf(),
            y: wr.score,
            holder: wr.player
          } as any;

          if (chartSymbols[camelize(wr.player)]) {
            chartDataObject.marker = {
              fillColor: chartSymbols[camelize(wr.player)].color,
              radius: 4
            };
          }

          chartData.push(chartDataObject);
        });

        vm.mameWRChartConfig.series.push({
          data: chartData,
          name: 'DK MAME WR',
          color: '#000000',
          lineWidth: 3,
          borderWidth: 0,
          marker: {
            enabled: true
          }
        });
      });

    timelineService
      .getTimelineData('combinedWRTimeline')
      .then(function then(response) {
        vm.combinedWRTimeline = response;

        var chartSymbols = {
          hankChien: {
            color: '#2ecc40'
          },

          billyMitchell: {
            color: '#ff4136'
          },

          steveWiebe: {
            color: '#0074d9'
          },

          timSczerby: {
            color: '#aaaaaa'
          },

          robbieLakeman: {
            color: '#ff851b'
          },

          wesCopeland: {
            color: '#b10dc9'
          },

          deanSaglio: {
            color: '#001f3f'
          },

          benJosWalbeehm: {
            color: '#ff8a65'
          }
        };

        var trackedPlayers = [];
        var chartData = [];
        vm.combinedWRTimeline.forEach(function(wr) {
          if (trackedPlayers.indexOf(wr.player) === -1) {
            vm.combinedWRPlayerCount += 1;
            trackedPlayers.push(wr.player);
          }

          var chartDataObject = {
            x: moment(wr.date)
              .utc()
              .valueOf(),
            y: wr.score,
            holder: wr.player
          } as any;

          if (chartSymbols[camelize(wr.player)]) {
            chartDataObject.marker = {
              fillColor: chartSymbols[camelize(wr.player)].color,
              radius: 4
            };
          }

          chartData.push(chartDataObject);
        });

        vm.combinedWRChartConfig.series.push({
          data: chartData,
          name: 'DK Combined WR',
          color: '#000000',
          lineWidth: 3,
          borderWidth: 0,
          marker: {
            enabled: true
          }
        });
      });

    timelineService.getTimelineData('ksTimeline').then(function then(response) {
      vm.ksTimeline = response;

      var histogramData = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ];

      vm.ksTimeline.forEach(function(newKs) {
        if (newKs.date.length === 4) {
          var scoreYear = Number(newKs.date);
        } else {
          var scoreYear = Number(newKs.date.split('/')[2]);
        }

        if (scoreYear < 2000) {
          histogramData[0] += 1;
        } else if (scoreYear === 2000) {
          histogramData[1] += 1;
        } else if (scoreYear === 2001) {
          histogramData[2] += 1;
        } else if (scoreYear === 2002) {
          histogramData[3] += 1;
        } else if (scoreYear === 2003) {
          histogramData[4] += 1;
        } else if (scoreYear === 2004) {
          histogramData[5] += 1;
        } else if (scoreYear === 2005) {
          histogramData[6] += 1;
        } else if (scoreYear === 2006) {
          histogramData[7] += 1;
        } else if (scoreYear === 2007) {
          histogramData[8] += 1;
        } else if (scoreYear === 2008) {
          histogramData[9] += 1;
        } else if (scoreYear === 2009) {
          histogramData[10] += 1;
        } else if (scoreYear === 2010) {
          histogramData[11] += 1;
        } else if (scoreYear === 2011) {
          histogramData[12] += 1;
        } else if (scoreYear === 2012) {
          histogramData[13] += 1;
        } else if (scoreYear === 2013) {
          histogramData[14] += 1;
        } else if (scoreYear === 2014) {
          histogramData[15] += 1;
        } else if (scoreYear === 2015) {
          histogramData[16] += 1;
        } else if (scoreYear === 2016) {
          histogramData[17] += 1;
        } else if (scoreYear === 2017) {
          histogramData[18] += 1;
        } else if (scoreYear === 2018) {
          histogramData[19] += 1;
        } else if (scoreYear === 2019) {
          histogramData[20] += 1;
        } else if (scoreYear === 2020) {
          histogramData[21] += 1;
        }
      });

      vm.ksHistogramConfig.series = [
        {
          data: histogramData,
          name: 'Killscreener Timeline (Histogram)',
          color: '#000000',
          lineWidth: 3,
          borderWidth: 0,
          marker: {
            enabled: true
          }
        }
      ];
    });

    timelineService
      .getTimelineData('millionTimeline')
      .then(function then(response) {
        vm.onemillionTimeline = response;

        var histogramData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        vm.onemillionTimeline.forEach(function(newKs) {
          if (newKs.date.length === 4) {
            var scoreYear = Number(newKs.date);
          } else {
            var scoreYear = Number(newKs.date.split('/')[2]);
          }

          if (scoreYear === 2004) {
            histogramData[0] += 1;
          } else if (scoreYear === 2005) {
            histogramData[1] += 1;
          } else if (scoreYear === 2006) {
            histogramData[2] += 1;
          } else if (scoreYear === 2007) {
            histogramData[3] += 1;
          } else if (scoreYear === 2008) {
            histogramData[4] += 1;
          } else if (scoreYear === 2009) {
            histogramData[5] += 1;
          } else if (scoreYear === 2010) {
            histogramData[6] += 1;
          } else if (scoreYear === 2011) {
            histogramData[7] += 1;
          } else if (scoreYear === 2012) {
            histogramData[8] += 1;
          } else if (scoreYear === 2013) {
            histogramData[9] += 1;
          } else if (scoreYear === 2014) {
            histogramData[10] += 1;
          } else if (scoreYear === 2015) {
            histogramData[11] += 1;
          } else if (scoreYear === 2016) {
            histogramData[12] += 1;
          } else if (scoreYear === 2017) {
            histogramData[13] += 1;
          } else if (scoreYear === 2018) {
            histogramData[14] += 1;
          } else if (scoreYear === 2019) {
            histogramData[15] += 1;
          } else if (scoreYear === 2020) {
            histogramData[16] += 1;
          }
        });

        vm.millionHistogramConfig.series = [
          {
            data: histogramData,
            name: 'Million-point Timeline (Histogram)',
            color: '#000000',
            lineWidth: 3,
            borderWidth: 0,
            marker: {
              enabled: true
            }
          }
        ];
      });

    timelineService
      .getTimelineData('millionHundredTimeline')
      .then(function then(response) {
        vm.oneonemillionTimeline = response;

        var histogramData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        vm.oneonemillionTimeline.forEach(function(newKs) {
          console.log({ newKs });
          var scoreYear = Number(newKs.date.split('/')[2]);

          if (scoreYear === 2010) {
            histogramData[0] += 1;
          } else if (scoreYear === 2011) {
            histogramData[1] += 1;
          } else if (scoreYear === 2012) {
            histogramData[2] += 1;
          } else if (scoreYear === 2013) {
            histogramData[3] += 1;
          } else if (scoreYear === 2014) {
            histogramData[4] += 1;
          } else if (scoreYear === 2015) {
            histogramData[5] += 1;
          } else if (scoreYear === 2016) {
            histogramData[6] += 1;
          } else if (scoreYear === 2017) {
            histogramData[7] += 1;
          } else if (scoreYear === 2018) {
            histogramData[8] += 1;
          } else if (scoreYear === 2019) {
            histogramData[9] += 1;
          } else if (scoreYear === 2020) {
            histogramData[10] += 1;
          }
        });

        vm.millionHundredHistogramConfig.series = [
          {
            data: histogramData,
            name: '1.1m-point Timeline (Histogram)',
            color: '#000000',
            lineWidth: 3,
            borderWidth: 0,
            marker: {
              enabled: true
            }
          }
        ];
      });

    timelineService
      .getTimelineData('millionTwoTimeline')
      .then(function then(response) {
        vm.onetwomillionTimeline = response;
      });

    timelineService.getDaysSinceData().then(function then(response) {
      vm.daysSinceData = response;
    });
  }

  function camelize(inputString) {
    if (inputString) {
      return inputString
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
          return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        })
        .replace(/\s+/g, '');
    }
  }
}
