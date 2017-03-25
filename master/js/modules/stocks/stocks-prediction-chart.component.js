/**=========================================================
 * Module: stocks,js
 * Angular Stocks table controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.stocks')
        .component('stocksPredictionChart', {
          template: '<flot dataset="$ctrl.areaData" options="$ctrl.areaOptions" callback="$ctrl.initialed" height="350px"></flot>',
          bindings: {
            current: '<',
            historical: '<',
            predictions: '<',
            previousClose: '<'
          },
          controller: StocksPredictionChartController
        });

  StocksPredictionChartController.$inject = ['$rootScope'];
    function StocksPredictionChartController($rootScope) {



      (function($){

        function init(plot) {
          plot.hooks.drawSeries.push(function(plot, ctx, series) {
            if (!series.dashes.show) return;

            var plotOffset = plot.getPlotOffset(),
                axisx = series.xaxis,
                axisy = series.yaxis;

            function plotDashes(xoffset, yoffset) {

              var points = series.datapoints.points,
                  ps = series.datapoints.pointsize,
                  prevx = null,
                  prevy = null,
                  dashRemainder = 0,
                  dashOn = true,
                  dashOnLength,
                  dashOffLength;

              if (series.dashes.dashLength[0]) {
                dashOnLength = series.dashes.dashLength[0];
                if (series.dashes.dashLength[1]) {
                  dashOffLength = series.dashes.dashLength[1];
                } else {
                  dashOffLength = dashOnLength;
                }
              } else {
                dashOffLength = dashOnLength = series.dashes.dashLength;
              }

              ctx.beginPath();

              for (var i = ps; i < points.length; i += ps) {

                var x1 = points[i - ps],
                    y1 = points[i - ps + 1],
                    x2 = points[i],
                    y2 = points[i + 1];

                if (x1 == null || x2 == null) continue;

                // clip with ymin
                if (y1 <= y2 && y1 < axisy.min) {
                  if (y2 < axisy.min) continue;   // line segment is outside
                  // compute new intersection point
                  x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                  y1 = axisy.min;
                } else if (y2 <= y1 && y2 < axisy.min) {
                  if (y1 < axisy.min) continue;
                  x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                  y2 = axisy.min;
                }

                // clip with ymax
                if (y1 >= y2 && y1 > axisy.max) {
                  if (y2 > axisy.max) continue;
                  x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                  y1 = axisy.max;
                } else if (y2 >= y1 && y2 > axisy.max) {
                  if (y1 > axisy.max) continue;
                  x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                  y2 = axisy.max;
                }

                // clip with xmin
                if (x1 <= x2 && x1 < axisx.min) {
                  if (x2 < axisx.min) continue;
                  y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                  x1 = axisx.min;
                } else if (x2 <= x1 && x2 < axisx.min) {
                  if (x1 < axisx.min) continue;
                  y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                  x2 = axisx.min;
                }

                // clip with xmax
                if (x1 >= x2 && x1 > axisx.max) {
                  if (x2 > axisx.max) continue;
                  y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                  x1 = axisx.max;
                } else if (x2 >= x1 && x2 > axisx.max) {
                  if (x1 > axisx.max) continue;
                  y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                  x2 = axisx.max;
                }

                if (x1 != prevx || y1 != prevy) {
                  ctx.moveTo(axisx.p2c(x1) + xoffset, axisy.p2c(y1) + yoffset);
                }

                var ax1 = axisx.p2c(x1) + xoffset,
                    ay1 = axisy.p2c(y1) + yoffset,
                    ax2 = axisx.p2c(x2) + xoffset,
                    ay2 = axisy.p2c(y2) + yoffset,
                    dashOffset;

                function lineSegmentOffset(segmentLength) {

                  var c = Math.sqrt(Math.pow(ax2 - ax1, 2) + Math.pow(ay2 - ay1, 2));

                  if (c <= segmentLength) {
                    return {
                      deltaX: ax2 - ax1,
                      deltaY: ay2 - ay1,
                      distance: c,
                      remainder: segmentLength - c
                    }
                  } else {
                    var xsign = ax2 > ax1 ? 1 : -1,
                        ysign = ay2 > ay1 ? 1 : -1;
                    return {
                      deltaX: xsign * Math.sqrt(Math.pow(segmentLength, 2) / (1 + Math.pow((ay2 - ay1)/(ax2 - ax1), 2))),
                      deltaY: ysign * Math.sqrt(Math.pow(segmentLength, 2) - Math.pow(segmentLength, 2) / (1 + Math.pow((ay2 - ay1)/(ax2 - ax1), 2))),
                      distance: segmentLength,
                      remainder: 0
                    };
                  }
                }
                //-end lineSegmentOffset

                do {

                  dashOffset = lineSegmentOffset(
                      dashRemainder > 0 ? dashRemainder :
                          dashOn ? dashOnLength : dashOffLength);

                  if (dashOffset.deltaX != 0 || dashOffset.deltaY != 0) {
                    if (dashOn) {
                      ctx.lineTo(ax1 + dashOffset.deltaX, ay1 + dashOffset.deltaY);
                    } else {
                      ctx.moveTo(ax1 + dashOffset.deltaX, ay1 + dashOffset.deltaY);
                    }
                  }

                  dashOn = !dashOn;
                  dashRemainder = dashOffset.remainder;
                  ax1 += dashOffset.deltaX;
                  ay1 += dashOffset.deltaY;

                } while (dashOffset.distance > 0);

                prevx = x2;
                prevy = y2;
              }

              ctx.stroke();
            }
            //-end plotDashes

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.lineJoin = 'round';

            var lw = series.dashes.lineWidth,
                sw = series.shadowSize;

            // FIXME: consider another form of shadow when filling is turned on
            if (lw > 0 && sw > 0) {
              // draw shadow as a thick and thin line with transparency
              ctx.lineWidth = sw;
              ctx.strokeStyle = "rgba(0,0,0,0.1)";
              // position shadow at angle from the mid of line
              var angle = Math.PI/18;
              plotDashes(Math.sin(angle) * (lw/2 + sw/2), Math.cos(angle) * (lw/2 + sw/2));
              ctx.lineWidth = sw/2;
              plotDashes(Math.sin(angle) * (lw/2 + sw/4), Math.cos(angle) * (lw/2 + sw/4));
            }

            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;

            if (lw > 0) {
              plotDashes(0, 0);
            }

            ctx.restore();

          });
          //-end draw hook
        }
        //-end init

        $.plot.plugins.push({
          init: init,
          options: {
            series: {
              dashes: {
                show: false,
                lineWidth: 2,
                dashLength: 10
              }
            }
          },
          name: 'dashes',
          version: '0.1'
        });

      })(jQuery);




      var vm = this;

      var plot;

      vm.initialed = function (p) {
        plot = p;
      };

      vm.areaOptions = getAreaOptions();
      vm.areaData = getAreaData();

      vm.$onChanges = function () {
        if (vm.predictions) drawChart();
      };

      function getMinYaxis () {
        var min = Infinity;
        var max = 0;

        vm.areaData.forEach(function (item) {
          item.data.forEach(function (point) {
            var price = point[1];
            if (min > price) min = price;
            if (max < price) max = price;
          });
        });

        if (min === Infinity) return 0;

        min = 2*min - max;
        if (min > 0) return Math.floor(min);

        return 0;
      }

      function drawChart() {
        var current = getCurrentPrice(vm.current);
        var historicalData = getHistoricalData(vm.historical);
        var predictionsData = getPredictionsData(vm.predictions);
        // var previousClose = getPreviousCloseData(vm.previousClose);

        var predictions = [].concat(historicalData.predictions, predictionsData.slice(0,1));
        var predictionTomorrow = predictionsData.slice(0, 2);
        var predictionExperimental = predictionsData.slice(1);

        var real = [].concat(historicalData.real);

        if (real.length && current.length) {
          if (real[real.length-1][0] === current[0][0]) {
            current[0] = real[real.length-1];
          } else {
            real.push(current[0]);
          }
        }

        if (predictionsData.length) current.push(predictionsData[0]);

        vm.areaData[0].data = predictionTomorrow;
        vm.areaData[1].data = predictions;
        vm.areaData[2].data = real;
        vm.areaData[3].data = current;
        vm.areaData[4].data = predictionExperimental;

        if (plot) {
          plot.getOptions().yaxes[0].min = getMinYaxis();
          plot.setData(vm.areaData);
          plot.setupGrid();
          plot.draw();
        }
      }

      function getPreviousCloseData (previousClose) {
        if(!previousClose) return;
        return [
          // moment(vm.previousClose.date).format('x'),
          moment().set({hour:0,minute:0,second:0,millisecond:0}).format('x'),
          vm.previousClose.price
        ];
      }

      function getNow () {
        var now = moment();
        var nowUTC = moment().utc();
        var minutes = now.get('minutes');
        var hour = nowUTC.get('hour');

        if(now.day() === 0 && now.day() === 6) return now;

        if (hour >= 15 && hour < 21) {
          now.set({hour:4 * (hour - 15), minute:0}).add(4 * minutes, 'minutes');
        } else {
          if (now.date() === nowUTC.date()) {
            if (hour < 15) {
              now.set({hour:0,minute:0,second:0,millisecond:0});
            } else {
              now.set({hour:24,minute:0,second:0,millisecond:0});
            }
          } else {
            if (now.get('hour') < 15) {
              now.set({hour:0,minute:0,second:0,millisecond:0});
            } else {
              now.set({hour:24,minute:0,second:0,millisecond:0});
            }
          }
        }

        return now;
      }

      function getCurrentPrice(current) {
        var now = getNow();

        if (!current) return [];
        return [[
          now.format('x'),
          current
        ]];
      }

      function getPredictionsData (predictions) {
        var predictionsPrices = [];

        if (!predictions) return [];

        var offsetByDay = moment(moment().format('YYYY-MM-DD')).diff(moment().utc().format('YYYY-MM-DD'))/60000; //minutes

        predictions.forEach(function (predictionItem) {
          if (predictionItem.prediction) {

            predictionsPrices.push([
              moment(predictionItem.prediction_date)
                  .add(offsetByDay - moment().utcOffset(), 'm')
                  .add(1, 'd')
                  .format('x'), //todo
              predictionItem.prediction
            ]);
          }
        });

        return predictionsPrices;
      }

      function getHistoricalData (historical) {
        var real = [];
        var predictions = [];

        if (historical) {

          var offsetByDay = moment(moment().format('YYYY-MM-DD')).diff(moment().utc().format('YYYY-MM-DD'))/60000; //minutes

          historical.dates.forEach(function (date, index) {

            var dateX = moment(date + 'T00:00:00.000Z')
                .add(offsetByDay - moment().utcOffset(), 'm')
                .add(1, 'd')
                .format('x');

            if (historical.closePrices[index]) {
              real.push([
                dateX,
                historical.closePrices[index]
              ]);
            }

            if (historical.predictions[index]) {
              predictions.push([
                dateX,
                historical.predictions[index]
              ]);
            }
          });
        }

        return {
          real: real,
          predictions: predictions
        };
      }

      function getAreaData () {
        return [
          {
            "label": "Prediction for tomorrow",
            "color": "#63abdf",
            points: {
              show: true,
              radius: 3
            },
              lines: {
                show: true
              },
            "data": []
          },
          {
            "label": "Historical prediction",
            "color": "#4f71df",
            points: {
              show: true,
              radius: 3
            },
            lines: {
              show: true
            },
            "data": []
          },
          {
            "label": "Historical prices",
            "color": "#ff786d",
            points: {
              show: true,
              radius: 3
            },
            lines: {
              show: true
            },
            "data": []
          },
          {
            "label": "Real-time price",
            "color": "#ffb093",
            dashes: { show: true, dashLength: 2 },
            points: {
              show: true,
              radius: 3
            },
            "data": []
          },
          {
            "label": "Prediction (experimental)",
            "color": "#add2df",
            dashes: { show: true },
            points: {
              show: true,
              radius: 3
            },
            "data": []
          }
        ];
      }

      function getAreaOptions () {
        var today = moment().set({hour:0,minute:0,second:0,millisecond:0}).format('x');
        var yesterday = moment().set({hour:24,minute:0,second:0,millisecond:0}).format('x');

        var now = getNow();

        return {
          legend: {
            show: true,
            position: "se",
            backgroundOpacity: 0.5
          },
          grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc',
            markings: [
              {
                xaxis: {
                  from: today,
                  to: yesterday
                },
                color: "#f6f6f6"
              },
              {
                xaxis: {
                  from: now.format('x'),
                  to: now.format('x')
                },
                color: "#ddd"
              }
            ]
          },
          tooltip: true,
          tooltipOpts: {
            content: function (label, x, y) { return y.toFixed(2); }
          },
          xaxis: {
            tickColor: '#fcfcfc',
            mode: 'time',
            timezone: "browser",
            tickSize: [1, 'day'],
            timeformat: "%b %d"
          },
          yaxis: {
            min: 0,
            minTickSize: 1,
            tickColor: '#eee',
            position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
            tickFormatter: function (v) {
              return v;
            }
          },
          shadowSize: 0
        };
      }
    }
})();
