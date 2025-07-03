import * as Highcharts from 'highcharts';
import moment from 'moment';

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

  function buildYearHistogram(timeline, startYear, endYear) {
    // If endYear is not provided, use current year.
    if (!endYear) {
      endYear = new Date().getFullYear();
    }
    
    // Initialize histogram data with zeros for each year.
    var histogramData = new Array(endYear - startYear + 1).fill(0);
    
    timeline.forEach(function(entry) {
      var scoreYear;
      
      // Handle both YYYY and MM/DD/YYYY date formats.
      if (entry.date.length === 4) {
        scoreYear = Number(entry.date);
      } else {
        scoreYear = Number(entry.date.split('/')[2]);
      }
      
      // Calculate the index and increment if within range.
      var index = scoreYear - startYear;
      if (index >= 0 && index < histogramData.length) {
        histogramData[index] += 1;
      }
    });
    
    return histogramData;
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
        categories: [], // Will be set dynamically
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
        categories: [], // Will be set dynamically
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
        categories: [], // Will be set dynamically
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

      var currentYear = new Date().getFullYear();
      // Build histogram starting from year 2000
      var histogramData = buildYearHistogram(vm.ksTimeline, 2000, currentYear);
      
      // Add a bucket at the beginning for pre-2000 scores
      histogramData.unshift(0);
      
      // Count pre-2000 scores
      vm.ksTimeline.forEach(function(newKs) {
        var scoreYear;
        if (newKs.date.length === 4) {
          scoreYear = Number(newKs.date);
        } else {
          scoreYear = Number(newKs.date.split('/')[2]);
        }
        
        if (scoreYear < 2000) {
          histogramData[0] += 1;
        }
      });
      
      // Build categories array dynamically
      var categories = ['Pre-2000'];
      for (var year = 2000; year <= currentYear; year++) {
        categories.push(year.toString());
      }
      vm.ksHistogramConfig.xAxis.categories = categories;

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

        var startYear = 2004;
        var currentYear = new Date().getFullYear();
        var histogramData = buildYearHistogram(vm.onemillionTimeline, startYear, currentYear);

        // Build categories array dynamically
        var categories = [];
        for (var year = startYear; year <= currentYear; year++) {
          categories.push(year.toString());
        }
        vm.millionHistogramConfig.xAxis.categories = categories;

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

        var startYear = 2010;
        var currentYear = new Date().getFullYear();
        var histogramData = buildYearHistogram(vm.oneonemillionTimeline, startYear, currentYear);

        // Build categories array dynamically
        var categories = [];
        for (var year = startYear; year <= currentYear; year++) {
          categories.push(year.toString());
        }
        vm.millionHundredHistogramConfig.xAxis.categories = categories;

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
