import * as Highcharts from 'highcharts';

export const appComponent = {
  template: require('html-loader!./app.component.ajs.html'),
  controller: function(MaterialCssVarsService) {
    activate();

    function activate() {
      MaterialCssVarsService.setDarkTheme(false);
      MaterialCssVarsService.setPrimaryColor('#ba3448');
      MaterialCssVarsService.setAccentColor('#89b3f3');
    }
  }
};

(Highcharts as any).lightMode = {
  colors: ['#0266C8', '#F90101', '#F2B50F', '#00933B'],
  chart: {
    style: {
      fontFamily: 'Roboto',
      color: '#444444'
    }
  },
  xAxis: {
    gridLineWidth: 1,
    gridLineColor: '#F3F3F3',
    lineColor: '#F3F3F3',
    minorGridLineColor: '#F3F3F3',
    tickColor: '#F3F3F3',
    tickWidth: 1
  },
  yAxis: {
    gridLineColor: '#F3F3F3',
    lineColor: '#F3F3F3',
    minorGridLineColor: '#F3F3F3',
    tickColor: '#F3F3F3',
    tickWidth: 1
  },
  legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  background2: '#505053',
  dataLabelsColor: '#B0B0B3',
  textColor: '#C0C0C0',
  contrastTextColor: '#F0F0F3',
  maskColor: 'rgba(255,255,255,0.3)'
};

(Highcharts as any).darkMode = {
  colors: ['#f5f5f5', '#F90101', '#F2B50F', '#00933B'],
  chart: {
    backgroundColor: '#2a2a2a',
    style: {
      fontFamily: 'Roboto',
      color: '#ffffff'
    }
  },
  xAxis: {
    gridLineWidth: 1,
    gridLineColor: 'rgba(255, 255, 255, 0.12)',
    lineColor: 'rgba(255, 255, 255, 0.12)',
    minorGridLineColor: 'rgba(255, 255, 255, 0.12)',
    tickColor: 'rgba(255, 255, 255, 0.12)',
    tickWidth: 1,
    title: {
      style: {
        color: '#ffffff'
      }
    },
    labels: {
      style: {
        color: 'white'
      }
    }
  },
  yAxis: {
    gridLineColor: 'rgba(255, 255, 255, 0.12)',
    lineColor: 'rgba(255, 255, 255, 0.12)',
    minorGridLineColor: 'rgba(255, 255, 255, 0.12)',
    tickColor: 'rgba(255, 255, 255, 0.12)',
    tickWidth: 1,
    title: {
      style: {
        color: '#ffffff'
      }
    },
    labels: {
      style: {
        color: 'white'
      }
    }
  },
  legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  background2: '#505053',
  dataLabelsColor: '#ffffff',
  textColor: '#ffffff',
  contrastTextColor: '#ffffff',
  maskColor: 'rgba(255,255,255,0.3)',
  title: {
    style: {
      color: '#ffffff'
    }
  },
  legend: {
    itemStyle: {
      color: 'white'
    }
  },
  subtitle: {
    style: {
      color: 'white'
    }
  }
};

// Apply the theme
Highcharts.setOptions((Highcharts as any).lightMode);
