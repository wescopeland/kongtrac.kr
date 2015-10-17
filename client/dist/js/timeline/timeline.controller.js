(function() {
    'use strict';

    angular
        .module('kongtrac.timeline')
        .controller('TimelineController', TimelineController);

    /* @ngInject */
    function TimelineController($filter, timelineService) {

        var vm = this;

        // Public Variables
        vm.arcadeWRChartConfig = {};
        vm.arcadeWRTimeline = [];
        vm.arcadeWRPlayerCount = 0;
        vm.mameWRChartConfigu = {};
        vm.mameWRTimeline = [];
        vm.mameWRPlayerCount = 0;
        vm.combinedWRChartConfig = {};
        vm.combinedWRTimeline = [];
        vm.combinedWRPlayerCount = 0;
        vm.ksTimeline = [];
        vm.onemillionTimeline = [];
        vm.oneonemillionTimeline = [];
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
		    decPlaces = Math.pow(10,decPlaces);

		    // Enumerate number abbreviations
		    var abbrev = [ "k", "m", "b", "t" ];

		    // Go through the array backwards, so we do the largest first
		    for (var i=abbrev.length-1; i>=0; i--) {

		        // Convert array index to "1000", "1000000", etc
		        var size = Math.pow(10,(i+1)*3);

		        // If the number is bigger or equal do the abbreviation
		        if(size <= number) {
		             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
		             // This gives us nice rounding to a particular decimal place.
		             number = Math.round(number*decPlaces/size)/decPlaces;

		             // Handle special case where we round up to the next abbreviation
		             if((number == 1000) && (i < abbrev.length - 1)) {
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
                            return '<b>' + this.point.holder.split(' ')[this.point.holder.split(' ').length-1] + ', ' + $filter('amDateFormat')(this.x, 'MMM YY') + '</b>: ' + $filter('number')(this.y);
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
        					return Highcharts.dateFormat('%b \'%y', this.value);
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
        			}
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
                            return '<b>' + this.point.holder.split(' ')[this.point.holder.split(' ').length-1] + ', ' + $filter('amDateFormat')(this.x, 'MMM YY') + '</b>: ' + $filter('number')(this.y);
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
        					return Highcharts.dateFormat('%b \'%y', this.value);
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
        			}
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
                            return '<b>' + this.point.holder.split(' ')[this.point.holder.split(' ').length-1] + ', ' + $filter('amDateFormat')(this.x, 'MMM YY') + '</b>: ' + $filter('number')(this.y);
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
        					return Highcharts.dateFormat('%b \'%y', this.value);
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
        			max: 1240000
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

        	timelineService.getTimelineData('arcadeWRTimeline').then(function then(response) {

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
        				x: moment(wr.date).utc().valueOf(),
        				y: wr.score,
        				holder: wr.player
        			};

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

        	timelineService.getTimelineData('mameWRTimeline').then(function then(response) {

        		vm.mameWRTimeline = response;

        		var chartSymbols = {

        			deanSaglio: {
        				color: '#001f3f'
        			},

        			benJosWalbeehm: {
        				color: '#2ecc40'
        			},

        			rossBenziger: {
        				color: '#39cccc'
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
        				x: moment(wr.date).utc().valueOf(),
        				y: wr.score,
        				holder: wr.player
        			};

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

        	timelineService.getTimelineData('combinedWRTimeline').then(function then(response) {

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
        				x: moment(wr.date).utc().valueOf(),
        				y: wr.score,
        				holder: wr.player
        			};

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
        	});

        	timelineService.getTimelineData('millionTimeline').then(function then(response) {
        		vm.onemillionTimeline = response;
        	});

        	timelineService.getTimelineData('millionHundredTimeline').then(function then(response) {
        		vm.oneonemillionTimeline = response;
        	});

        	timelineService.getTimelineData('millionTwoTimeline').then(function then(response) {
        		vm.onetwomillionTimeline = response;
        	});

        }

        function camelize(inputString) {

            if (inputString) {
                return inputString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
                }).replace(/\s+/g, '');
            }

        }

    }
    TimelineController.$inject = ["$filter", "timelineService"];
})();