/*!
 *
 * Angle - Bootstrap Admin App + AngularJS Material
 *
 * Version: 3.5.4
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

// APP START
// -----------------------------------

(function() {
    'use strict';

    angular
        .module('wtst', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.maps',
            'app.utils',
            'app.material',
            'app.stocks',
            'app.charts',
            'app.auths',
            'app.services'
        ]);
})();

(function() {
    'use strict';

    angular
        .module('app.auths', []);
})();

(function() {
    'use strict';

    angular
        .module('app.charts', []);
})();
(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'ui.utils',
            'ngAria',
            'ngMessages'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.maps', []);
})();
(function() {
    'use strict';

    angular
        .module('app.material', [
            'ngMaterial'
          ]);
})();
(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.services', []);
})();

(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.stocks', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
/**=========================================================
 * Module: changePassword.controller.js
 * Demo for changePassword api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auths')
        .controller('ChangePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = ['$rootScope', '$http', '$state', '$timeout', 'authService'];

    function ChangePasswordController($rootScope, $http, $state, $timeout, authService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';
            vm.status = false;
            vm.correctPassword = false;

            vm.changePassword = function() {
                vm.authMsg = '';

                if (vm.changePasswordForm.$valid) {
                    authService.changePassword(vm.account.currentPassword, vm.account.newPassword).then(
                        function(password) {
                          vm.status = true;
                          vm.authMsg = 'Successfully. Go to Login page';
                          $timeout(function () {
                            $state.go('auth.login');
                          }, 1000);
                        },
                        function(errors) {
                          if (errors.data && errors.data.message) {
                            vm.authMsg = errors.data.message;
                            vm.account.currentPassword = '';
                            // vm.correctPassword = true;
                          } else {
                            vm.authMsg = 'Server Request Error';
                          }
                        }
                    );
                } else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.changePasswordForm.account_current_password.$dirty = true;
                    vm.changePasswordForm.account_new_password.$dirty = true;
                    vm.changePasswordForm.account_new_password_confirm.$dirty = true;
                }
            };
        }
    }
})();

/**=========================================================
 * Module: forgotPassword.controller.js
 * Demo for forgotPassword api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auths')
        .controller('ForgotPasswordController', ForgotPasswordController);

    ForgotPasswordController.$inject = ['$rootScope', '$http', '$state', '$timeout', 'authService'];

    function ForgotPasswordController($rootScope, $http, $state, $timeout, authService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';
            vm.status = false;

            vm.forgotPassword = function() {
                vm.authMsg = '';

                if (vm.forgotPasswordForm.$valid) {
                    authService.forgotPassword(vm.account.email).then(
                        function(email) {
                          vm.status = true;
                          vm.authMsg = 'Successfully. Go to Login page';
                          $timeout(function () {
                            $state.go('auth.login');
                          }, 1000);
                        },
                        function(errors) {
                          if (errors.data && errors.data.message) {
                            vm.authMsg = errors.data.message;
                          } else {
                            vm.authMsg = 'Server Request Error';
                          }
                        }
                    );
                } else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.forgotPasswordForm.email.$dirty = true;
                }
            };
        }
    }
})();

/**=========================================================
 * Module: login.controller.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auths')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$rootScope', '$http', '$state', 'authService'];

    function LoginFormController($rootScope, $http, $state, authService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';

            vm.login = function() {
                vm.authMsg = '';

                if (vm.loginForm.$valid) {
                    authService.login(vm.account.email, vm.account.password).then(
                        function(user) {
                            $state.go('app.home');
                        },
                        function(errors) {
                          if (errors.data && errors.data.message) {
                            vm.authMsg = errors.data.message;
                          } else {
                            vm.authMsg = 'Server Request Error';
                          }
                        }
                    );
                } else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.loginForm.account_email.$dirty = true;
                    vm.loginForm.account_password.$dirty = true;
                }
            };
        }
    }
})();

/**=========================================================
 * Module: register.controller.js
 * Demo for register account api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auths')
        .controller('RegisterFormController', RegisterFormController);

    RegisterFormController.$inject = ['$http', '$state', 'authService'];

    function RegisterFormController($http, $state, authService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';

            vm.register = function() {
                vm.authMsg = '';

                if (vm.registerForm.$valid) {

                  authService.register(
                      vm.account.name,
                      vm.account.username,
                      vm.account.email,
                      vm.account.password
                  )
                    .then(function() {
                        $state.go('app.home');
                    }, function(errors) {
                        if (errors.data && errors.data.message) {
                          vm.authMsg = errors.data.message;
                        } else {
                          vm.authMsg = 'Server Request Error';
                        }
                    });
                } else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.registerForm.account_name.$dirty = true;
                    vm.registerForm.account_username.$dirty = true;
                    vm.registerForm.account_email.$dirty = true;
                    vm.registerForm.account_password.$dirty = true;

                }
            };
        }
    }
})();

/**=========================================================
 * Module: resetPassword.controller.js
 * Demo for resetPassword api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auths')
        .controller('ResetPasswordController', ResetPasswordController);

    ResetPasswordController.$inject = ['$rootScope', '$http', '$state', '$timeout', 'authService'];

    function ResetPasswordController($rootScope, $http, $state, $timeout, authService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';
            vm.status = false;

            vm.resetPassword = function() {
                vm.authMsg = '';

                if (vm.resetPasswordForm.$valid) {
                    authService.resetPassword(vm.account.email, vm.account.password, vm.account.key).then(
                        function(password) {
                          vm.status = true;
                          vm.authMsg = 'Successfully. Go to Login page';
                          $timeout(function () {
                            $state.go('auth.login');
                          }, 1000);
                        },
                        function(errors) {
                          if (errors.data && errors.data.message) {
                            vm.authMsg = errors.data.message;
                          } else {
                            vm.authMsg = 'Server Request Error';
                          }
                        }
                    );
                } else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.resetPasswordForm.account_email.$dirty = true;
                    vm.resetPasswordForm.account_password.$dirty = true;
                    vm.resetPasswordForm.account_password_confirm.$dirty = true;
                    vm.resetPasswordForm.account_key.$dirty = true;
                }
            };
        }
    }
})();

/**=========================================================
 * Module: flot.js
 * Initializes the Flot chart plugin and handles data refresh
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('flot', flot);

    flot.$inject = ['$http', '$timeout'];

    function flot($http, $timeout) {

        var directive = {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                dataset: '=?',
                options: '=',
                series: '=',
                callback: '=',
                src: '='
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            var height, plot, plotArea, width;
            var heightDefault = 220;

            plot = null;

            width = attrs.width || '100%';
            height = attrs.height || heightDefault;

            plotArea = $(element.children()[0]);
            plotArea.css({
                width: width,
                height: height
            });

            function init() {
                var plotObj;
                if (!scope.dataset || !scope.options) return;
                plotObj = $.plot(plotArea, scope.dataset, scope.options);
                scope.$emit('plotReady', plotObj);
                if (scope.callback) {
                    scope.callback(plotObj, scope);
                }

                return plotObj;
            }

            function onDatasetChanged(dataset) {
                if (plot) {
                    plot.setData(dataset);
                    plot.setupGrid();
                    return plot.draw();
                } else {
                    plot = init();
                    onSerieToggled(scope.series);
                    return plot;
                }
            }
            var $watchOff1 = scope.$watchCollection('dataset', onDatasetChanged, true);

            function onSerieToggled(series) {
                if (!plot || !series) return;
                var someData = plot.getData();
                for (var sName in series) {
                    angular.forEach(series[sName], toggleFor(sName));
                }

                plot.setData(someData);
                plot.draw();

                function toggleFor(sName) {
                    return function(s, i) {
                        if (someData[i] && someData[i][sName])
                            someData[i][sName].show = s;
                    };
                }
            }
            var $watchOff2 = scope.$watch('series', onSerieToggled, true);

            function onSrcChanged(src) {

                if (src) {

                    $http.get(src)
                        .success(function(data) {

                            $timeout(function() {
                                scope.dataset = data;
                            });

                        }).error(function() {
                            $.error('Flot chart: Bad request.');
                        });

                }
            }
            var $watchOff3 = scope.$watch('src', onSrcChanged);

            scope.$on('$destroy', function(){
                // detach watches and scope events
                $watchOff1();
                $watchOff2();
                $watchOff3();
                // destroy chart
                if (plot) plot.destroy();
            });

        }
    }


})();

/**=========================================================
 * Module: charts,js
 * Angular Halo chart controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.charts')
        .controller('HaloChartController', HaloChartController);

  HaloChartController.$inject = ['$rootScope', '$q', '$location', '$timeout'];
    function HaloChartController($rootScope, $q, $location, $timeout) {
      var vm = this;

      vm.dataset = [];
      vm.loading = false;
      $rootScope.app.hashUrl = $location.url();

      $timeout(function () {
        vm.loading = true;
      }, 6000);

      // getSentiment();

      function getSentiment() {
        sentimentService.getSentiment().then(
          (data) => {
            vm.dataset = data;
          },
          (err) => {
            console.error(err);
          }
        )
      }

    }
})();

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('haloChart', haloChart);

    haloChart.$inject = ['$rootScope', '$document', '$localStorage'];

    function haloChart($rootScope, $document, $localStorage) {

        var directive = {
            restrict: 'EA',
            templateUrl: $rootScope.app.templateDir + 'halo.chart.template.html',
            scope: {
                loading: '='
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs) {

          scope.$on('$destroy', function() {
            if (refreshIntervalId) {
              clearInterval(refreshIntervalId);
            }
            d3.selectAll("svg > *").remove();
            d3.select("#viz_container").selectAll("svg").remove();
          });

          var data;           // Holds the currently used data (senate or house)
          var dataSource={};  // Object holds both senate and house data sources.
          var delay=3000;
          var accumSliderSeries = [];
          var sliderPointer = 0;
          var sliderStrokeDistance = 6; // distance between 2 strokes
          var widthStroke = 2;
          var widthStrokeActive = 2.5;
          var currentApiData = null;
          var refreshIntervalId = undefined;
          var distinctGroupKeys = [];
          var playPause;
          var currentApiData, running=true;

          var rect, screenWidth, screenHeight, outerRadius,
              viz, viz_container, viz_title, theme,
              timeSlider, mGroup, titleEnter, circleEnter, labelEnter,
              monthEnter, monthUpdate
              ;

          var arrStock = ["MAT", "AMZN", "FB", "GOOGL", "INTU", "NVDA", "PCLN", "TSLA", "TRIP", "SRCL",
                          "AMAT", "AMGN", "AMZN", "ATVI", "AVGO", "BBBY", "BIDU", "BIIB", "BMRN", "CA",
                          "CTSH", "CTXS", "DISCA", "DISCK", "DISH", "DLTR", "EA", "EBAY", "ENDP", "ESRX",
                          "LRCX", "LVNTA", "MAR", "MAT", "MDLZ", "MNST", "MSFT", "MU", "MXIM", "MYL"];

          var arrStock2 = ["CHKP", "CHTR", "CMCSA", "COST", "DLTR", "EA", "EBAY", "ENDP", "ESRX", "EXPE",
                          "CTSH", "CTXS", "DISCA", "DISCK", "DISH", "EBAY", "INTC", "INTU", "ISRG", "KLAC",
                          "LRCX", "LVNTA", "MAR", "MAT", "MDLZ", "MNST", "MSFT", "MU", "MXIM", "MYL",
                          "MAT", "AMZN", "FB", "GOOGL", "NFLX", "NVDA", "PCLN", "TSLA", "TRIP", "SRCL",];

          var vizuly = window.vizuly;

          if (self == top) {
              rect = $document[0].body.getBoundingClientRect();
          } else {
              rect = parent.$document[0].body.getBoundingClientRect();
          }

          //Set display size based on window size.
          screenWidth = (rect.width < 960)
              ? Math.round(rect.width * .95)
              : Math.round((rect.width - 210) * .95)
          screenHeight = 600;//Math.min(parent.innerHeight * 0.75, screenWidth);
          screenWidth = 600;//screenHeight;
          outerRadius = (screenWidth / 2);

          d3.select(element[0].querySelector('#currentDisplay')).attr("item_value", screenWidth + "," + screenHeight).attr("class", "selected").html("<a>" + screenWidth + "px - " + screenHeight + "px</a>");

          // Set the size of our container element.
          viz_container = d3.selectAll(element[0].querySelector('#viz_container')).style("width", screenWidth + "px").style("height", screenHeight + "px");

          viz = vizuly.viz.halo_cluster(element[0].querySelector('#viz_container'));

          timeSlider = d3.select(element[0].querySelector('#timeSlider'))
              .style("width", screenWidth + "px")
              .style("height", 50 + "px")
              .style("margin", "0 auto")
              .append("svg")
              .attr("class","timeSlider")
              .style("width", screenWidth + "px")
              .style("height", 50 + "px")
              .style("margin", 0 + " auto");

          mGroup = timeSlider.append("g")
              .style("height", 50 + "px")
              .style("margin", 10 + " auto")
              .attr("class","months")
              .style("cursor","pointer");

          // Draw title and legend
          var svgInfoChart = d3.select(element[0].querySelector('#infoChart'))
              .style("width", "100%")
              .style("height", 90 + "px")
              .append("svg")
              .attr("class", "info-chart")
              .attr("transform", "translate(" + 0 + ","  + 0 + ")")
              .style("width", "100%")
              .style("height", 90 + "px")
              .style("fill", "#000");

          // Legend
          var cGroup = svgInfoChart.append("g")
              .attr("class","circles")
              .style("width", "100%")
              .attr("transform", "translate(" + 10 + ","  + 45 + ")");

          var dataCircle = [
              { "x_axis": 0, "y_axis": 0, "radius": 8, "color" : "#4CAF50" },
              { "x_axis": 0, "y_axis": 25, "radius": 8, "color" : "#F44336" }
          ];

          var dataLabel = [
              { label: 'Positive sentiment' },
              { label: 'Negative sentiment' },
          ]

          var circleAxis = cGroup.selectAll("g.circle")
              .data(dataCircle);

          var labelAxis = cGroup.selectAll("g.circle")
              .data(dataLabel);

          circleEnter = circleAxis.enter();

          labelEnter = labelAxis.enter();

          circleEnter.append("circle")
              .attr("cx", function(d) {
                  return d.x_axis;
              })
              .attr("cy", function(d) {
                  return d.y_axis;
              })
              .attr("r", function(d) {
                  return d.radius;
              })
              .style("fill", function(d) {
                  return d.color;
              });

          labelEnter.append("text")
              .style("font-size", "14px")
              .text(function(d) {
                  return d.label;
              })
              .attr("transform", function(d, i) {
                  return "translate(" + 15 + ","  + ((i === 0) ? 5 : 30) + ")"
              });

          // D3 formatters we will use for labels
          var formatDate = d3.time.format("%b %d, 20%y");

          // Set our party colors
          var repColor="#F44336";
          var demColor="#4CAF50";
          var otherColor="#FFa400";

          // Create a skin object that has all of the same properties as the skin objects in the /themes/halo.js vizuly file
          var customSkin = {
              name: "custom",
              labelColor: "#FFF",
              labelFill: "#000",
              background_transition: function (selection) {
                  viz.selection().select(".vz-background").transition(1000).style("fill-opacity", 0);
              },
              // Here we set the contribution colors based on the party
              link_stroke: function (d, i) {
                  return (d.data.PTY == "negative") ? repColor : (d.nodeGroup="positive") ? demColor: otherColor;
              },
              link_fill: function (d, i) {
                  return (d.data.PTY == "negative") ? repColor : (d.nodeGroup="positive") ? demColor: otherColor;
              },
              link_fill_opacity:.2,
              link_node_fill_opacity:.5,
              node_stroke: function (d, i) {
                  return "#FFF";
              },
              node_over_stroke: function (d, i) {
                  return "#FFF";
              },
              // Here we set the candidate colors based on the party
              node_fill: function (d, i) {
                  return (d.nodeGroup == "negative") ? repColor : (d.nodeGroup=="positive") ? demColor: otherColor;
              },
              arc_stroke: function (d, i) {
                  return "#FFF";
              },
              // Here we set the arc contribution colors based on the party
              arc_fill: function (d, i) {
                  return (d.data.PTY == "negative") ? repColor : (d.nodeGroup=="positive") ? demColor: otherColor;
              },
              arc_over_fill: function (d, i) {
                  return "#000";
              },
              class: "vz-skin-political-influence-no"
          };

          playPause = $('#playPause');

          playPause.on('click',stopStart);

          function stopStart() {
              if (running==true) {
                  running=false;
                  stopAnnimation();
                  playPause.attr('src', 'app/img/play_bw.png');
              }
              else {
                  running=true;
                  playPause.attr('src', 'app/img/pause_bw.png');
                  scheduleAnnimation();
              }
          }

          loadData();

          function loadData() {

              fetchData(function(tmpDataApi) {
                if (tmpDataApi.length < arrStock.length) {
                  return;
                }
                  buildSliderSeries(tmpDataApi);

                  scope.loading = true;

                  var updating = false;
                  if (updating) {
                      return;
                  }
                  updating = true;

                  if (!parseDataAndUpdate(tmpDataApi)) {
                      clearInterval(refreshIntervalId);
                      loadData();
                  } else {
                      updating = false;
                      scheduleAnnimation();
                  }
              });
          }

          function fetchData(callback) {
            var tmpDataApi = [];
            var url;

            for (let i = 0; i < arrStock.length; i++) {
              url = 'http://watson.wtst.io/sentiments/states?count=40&threshold=0.02&tickers=' + arrStock[i];

              $.ajax({
                  url: url,
                  method: 'GET'
              }).success(function (response) {
                tmpDataApi.push(response);
                if (callback) {
                    callback(tmpDataApi);
                }
              }).fail(function () {
                  console.log('Fail to get data from api: ' + url);
              });
            }
          }

          // function fetchData(callback) {
          //     var tmpDataApi = [];
          //
          //     if (!$rootScope.app.haloApiData) {
          //       var url = 'http://watson.wtst.io/sentiments/states?count=40&threshold=0.02&tickers=AAPL,AMZN,FB,GOOGL,NFLX,NVDA,PCLN,TSLA,TRIP,SRCL,AMAT,AMGN,AMZN,ATVI,AVGO,BBBY,BIDU,BIIB,BMRN,CA,CTSH,CTXS,DISCA,DISCK,DISH,DLTR,EA,EBAY,ENDP,ESRX,LRCX,LVNTA,MAR,MAT,MDLZ,MNST,MSFT,MU,MXIM,MYL';
          //       $.ajax({
          //           url: url,
          //           method: 'GET'
          //       }).success(function (response) {
          //         tmpDataApi = response;
          //         $localStorage.haloData = tmpDataApi;
          //
          //         if (callback) {
          //             callback(tmpDataApi);
          //         }
          //       }).fail(function () {
          //           console.log('Fail to get data from api: ' + url);
          //       });
          //     } else {
          //       tmpDataApi = $rootScope.app.haloApiData
          //       if (callback) {
          //           callback(tmpDataApi);
          //       }
          //     }
          // }

          function parseDataAndUpdate(tmpDataApi) {
              if (parseData(tmpDataApi, sliderPointer) === null) {
                  return false;
              } else {
                  if (!sliderPointer) {
                      currentApiData = tmpDataApi;
                  } else {
                      tmpDataApi[sliderPointer] = currentApiData[sliderPointer-1];
                  }

                  update(parseData(tmpDataApi, sliderPointer));
                  return true;
              }
          }

          function parseData(source, index) { // zero base index of item index
            let dataIndex = index;
            let internalData = [];
            let k = 0;
            if (dataIndex < source.length) {
              for (let i = 0; i < source.length; i++) {
                let sourceInner = source[i];
                if (sourceInner.length > 0) {
                  for (let j = 0; j < sourceInner.length; j++) {
                    let sourceInnerTwo = sourceInner[j];
                    if (sourceInnerTwo.length > 0) {
                      for (let z = 0; z < sourceInnerTwo.length; z++) {
                        k++;
                        let arr = sourceInnerTwo[z];
                        let item = {
                          CAND_ID: arr[0], // "IRBT"
                          CAND_NAME: arr[0], // "IRBT"
                          CMTE_ID: arr[1].replace(/[\. ]/g, '_'), // "www.broadcastnewsroom.com"
                          CMTE_NM: arr[1], // "www.broadcastnewsroom.com"
                          Key: 'k' + k, // "K0"
                          PTY: (arr[2] >= 0 ? 'positive' : 'negative'), // "positive"
                          TRANSACTION_AMT: (arr[2] == 0 ? '0.5' : arr[2]) // "0.923376024"
                        };
                        internalData.push(item);
                      }
                    }
                  }
                }
              }

              for (let j = 0; j < internalData.length; j++) {
                for (let z = 0; z < internalData.length; z++) {
                  if (internalData[j].CAND_NAME === internalData[z].CAND_NAME) {
                    if (internalData[j].TRANSACTION_AMT < 0) {
                      internalData[j].CAND_ID = '_' + internalData[j].CAND_ID;
                    }
                    if (internalData[z].TRANSACTION_AMT < 0) {
                      internalData[z].CAND_ID = '_' + internalData[z].CAND_ID;
                    }
                  }
                }
                if (distinctGroupKeys.indexOf(internalData[j].CMTE_ID) < 0) {
                    distinctGroupKeys.push(internalData[j].CMTE_ID);
                }
              }

              return data = internalData;
            }

            return null;
          }

          // function parseData(source, index) { // zero base index of item index
          //
          //     let dataIndex = index;
          //     let arr = source[dataIndex];
          //     let internalData = [];
          //
          //     if (dataIndex < source.length) {
          //       for (let i = 0; i < arr.length; i++) {
          //         let item = {
          //             CAND_ID: arr[i][0], // "IRBT"
          //             CAND_NAME: arr[i][0], // "IRBT"
          //             CMTE_ID: arr[i][1].replace(/[\. ]/g, '_'), // "www.broadcastnewsroom.com"
          //             CMTE_NM: arr[i][1], // "www.broadcastnewsroom.com"
          //             Key: arr[i][3], // "K0"
          //             PTY: (arr[i][2] > 0 ? 'positive' : 'negative'), // "positive"
          //             TRANSACTION_AMT: arr[i][2] // "0.923376024"
          //         };
          //         internalData.push(item);
          //       }
          //
          //       for (let j = 0; j < internalData.length; j++) {
          //         for (let z = 0; z < internalData.length; z++) {
          //           if (internalData[j].CAND_NAME === internalData[z].CAND_NAME) {
          //             if (internalData[j].TRANSACTION_AMT < 0) {
          //               internalData[j].CAND_ID = '_' + internalData[j].CAND_ID;
          //             }
          //             if (internalData[z].TRANSACTION_AMT < 0) {
          //               internalData[z].CAND_ID = '_' + internalData[z].CAND_ID;
          //             }
          //           }
          //         }
          //       }
          //
          //       // internalData = internalData.slice(0, 10);
          //       return internalData;
          //     }
          //     return null;
          // }

          function scheduleAnnimation() {
              if (!currentApiData) {
                  return;
              }
              refreshIntervalId = setInterval(function() {
                if (sliderPointer >= arrStock.length) {
                  clearInterval(refreshIntervalId);
                  arrStock = arrStock2;
                  sliderPointer = 0;
                  loadData();
                }
                  shiftRight();
                  update(data);
                  // console.log('refreshInterval: ' + refreshIntervalId);
                  // update(parseData(currentApiData, sliderPointer));
              }, delay);
          }
          function stopAnnimation() {
              if (refreshIntervalId) {
                  clearInterval(refreshIntervalId);
              }
          }
          function shiftRight() {
              var lastItem = distinctGroupKeys[distinctGroupKeys.length - 1];
              for (var i = distinctGroupKeys.length - 1; i >= 1; i--) {
                  distinctGroupKeys[i] = distinctGroupKeys[i - 1];
              }
              distinctGroupKeys[0] = lastItem;

              var shiftedData = [];
              for (var i = 0; i < distinctGroupKeys.length; i++) {
                  for (var j = 0; j < data.length; j++) {
                      if (data[j].CMTE_ID == distinctGroupKeys[i]) {
                          shiftedData.push(data[j]);
                      }
                  }
              }
              data = shiftedData;
          }

          //Initializes chart and container.
          function update(data) {

            // console.log('sliderPointer: ' + sliderPointer);

              updateSliders(sliderPointer++);
              // if (sliderPointer === accumSliderSeries.length) {
              //     sliderPointer = 0;
              // }

              viz.data(data)
                  .width(800).height(600)                     // Initial display size
                  .haloKey(function (d) {
                      return d.CMTE_ID; })                    // The property that determines each PAC
                  .nodeKey(function (d) {
                      return d.CAND_ID; })                    // The property that determines Candidate
                  .nodeGroupKey(function (d) {
                      return d.PTY; })                        // The property that determines candidate Party affiliation
                  .value(function (d) {
                      return Math.abs(Number(d.TRANSACTION_AMT)); })            // The property that determines the weight/size of the link path
                  .on("update", onUpdate)                     // Callback for viz update
                  .on("nodeover",node_onMouseOver)            // Callback for mouseover on the candidates
                  .on("nodeout",onMouseOut)                   // Callback for mouseout on from the candidate
                  .on("arcover",arc_onMouseOver)              // Callback for mouseover on each PAC
                  .on("arcout",onMouseOut)                    // Callback for mouseout on each PAC
                  .on("linkover",link_onMouseOver)            // Callback for mousover on each contribution
                  .on("linkout",onMouseOut)                   // Callback for mouseout on each contribution
                  .on("nodeclick",node_onClick)

              theme = vizuly.theme.halo(viz);

              theme.skins()["custom"]=customSkin;
              theme.skin("custom");

              viz_title = viz.selection().select("svg").append("text").attr("class", "title")
                  .style("font-family","Raleway")
                  .attr("x", viz.width() / 2).attr("y", 40).attr("text-anchor", "middle").style("font-weight",300).text("");

              //Update the size of the component
              if ($rootScope.app.hashUrl === '/') {
                changeSize(d3.select("#currentDisplay").attr("item_value"));
              }
          }

          function buildSliderSeries(apiData) { // data from API
              if (!apiData) {
                  return;
              }

              var countSliderPoints = function (dataFromApi) {
                  return dataFromApi.length; // first item is for naming
              };

              var buildPoint = function(index) {
                  return {
                      index: index,
                      xAxisLabel: '',
                      peakLabel: ''
                  };
              };

              accumSliderSeries = [];
              for (var i = 0; i < countSliderPoints(apiData); i++) {
                  accumSliderSeries.push(buildPoint(i))
              }

              if ((accumSliderSeries.length - 1) * sliderStrokeDistance > screenWidth) {
                  sliderStrokeDistance = 3;
                  widthStroke = 1;
                  widthStrokeActive = 1.5;
              }
              if ((accumSliderSeries.length - 1) > 200) {
                  sliderStrokeDistance = 2;
                  widthStroke = 0.75;
                  widthStrokeActive = 1;
              }
              var sliderWidth = sliderStrokeDistance * accumSliderSeries.length;
              mGroup.attr("transform", "translate(" + (outerRadius - sliderWidth/2) + ","  + 20 + ")");
              sliderPointer = 0;
          }

          // Time slider
          function updateSliders(currentIndex) {
              function getStrokeY1(ordinalFromCurrent) {
                  if (ordinalFromCurrent == 0)
                      return 0;
                  else if (ordinalFromCurrent == 1)
                      return 4;
                  else if (ordinalFromCurrent == 2)
                      return 8;
                  else if (ordinalFromCurrent == 3)
                      return 11;
                  else if (ordinalFromCurrent == 4)
                      return 14;
                  else if (ordinalFromCurrent == 5)
                      return 15;
                  else if (ordinalFromCurrent == 6)
                      return 15;
                  else
                      return 16;
              }
              function getOpacityFromCurrent(ordinalFromCurrent) {
                  if (ordinalFromCurrent == 0)
                      return 1;
                  else if (ordinalFromCurrent == 1)
                      return .9;
                  else if (ordinalFromCurrent == 2)
                      return .8;
                  else if (ordinalFromCurrent == 3)
                      return .7;
                  else if (ordinalFromCurrent == 4)
                      return .6;
                  else if (ordinalFromCurrent == 5)
                      return .5;
                  else if (ordinalFromCurrent == 6)
                      return .4;
                  else
                      return .4;
              }

              var maxHeight = 22;

              var monthAxis = mGroup.selectAll("g.month")
                  .data(accumSliderSeries);

              monthEnter = monthAxis.enter()
                  .append("g")
                  .attr("class", "month");

              // draw a vertical line
              // (x1, y1) top, (x2, y2) bottom. x1 = x2
              monthEnter.append("line")
                  .attr("x1", function (dataAtI, i) {
                      return i * sliderStrokeDistance;
                  })
                  .attr("x2", function (dataAtI, i) {
                      return i * sliderStrokeDistance;
                  })
                  .attr("y1", function (dataAtI, i) {
                      var ordinalFromCurrent = Math.abs(currentIndex - i);
                      return getStrokeY1(ordinalFromCurrent);
                  })
                  .attr("y2", maxHeight)
                  .attr("shape-rendering", "crispEdges")
                  .attr('stroke-width', widthStroke)
                  .style("stroke-opacity", function (d, i) {
                      var ordinalFromCurrent = Math.abs(currentIndex - i);
                      return getOpacityFromCurrent(ordinalFromCurrent);
                  })
                  .style("stroke", "#000")
                  .on("click", function (d) {
                      sliderPointer = d.index;
                      parseDataAndUpdate(currentApiData);
                  });


              // top text
              monthEnter.append("text")
                  .attr("transform", function (dataAtI, i) {
                      return "translate (" + String(i * sliderStrokeDistance - 10) + ", -3)";
                  })
                  .text(function (dataAtI, i) {
                      return dataAtI.peakLabel;
                  })
                  .style("fill-opacity", function (d, i) {
                      return 0; // hide by default, will be delay-shown latter
                  });

              // bottom text
              monthEnter.append("text")
                  .attr("transform", function (dataAtI, i) {
                      return "translate (" + (i * sliderStrokeDistance - 10) + ",33)";
                  })
                  .text(function (dataAtI, i) {
                      return dataAtI.xAxisLabel + '';
                  });

              monthUpdate = monthAxis.transition();

              // show/hide text
              monthUpdate.select("text")
                  .delay(delay / 2)
                  .style("fill-opacity", function (d) {
                      if (d.index == currentIndex) {
                          return 1;
                      }
                      return 0;
                  });

              monthUpdate.select("line")
                  .delay(delay / 2)
                  .attr("y1", function (d, i) {
                      var ordinalFromCurrent = Math.abs(currentIndex - i);
                      return getStrokeY1(ordinalFromCurrent);
                  })
                  .style("stroke-width", function (d, i) {
                      if (i == currentIndex) {
                          return widthStrokeActive;
                      }
                      return widthStroke;
                  })
                  .style("stroke-opacity", function (d, i) {
                      var ordinalFromCurrent = Math.abs(currentIndex - i);
                      return getOpacityFromCurrent(ordinalFromCurrent);
                  })
                  .style("stroke", "#000");

          }

          // Each time the viz is updated we adjust our title color
          // Do a little tweak for our custom skin.
          function onUpdate() {
              viz_title.style("fill", (theme.skin() != customSkin) ? theme.skin().labelColor : "#000");
          }

          // An example of how you could respond to a node click event
          function node_onClick(e,d,i) {
              console.log("You have just clicked on " + d.values[0].CAND_NAME);
          }

          // For each mouse over on the node we want to create a datatip that shows information about the candidate
          // and any assoicated PACs that have contributed to the candidate.
          function node_onMouseOver(e,d,i) {
              stopAnnimation();

              //Find all node links (candidates) and create a label for each arc
              var haloLabels={};
              var links=viz.selection().selectAll(".vz-halo-link-path.node-key_" + d.key);
              var total=0;

              //For each link we want to dynamically total the transactions to display them on the datatip.
              links.each(function (d) {
                  total+= viz.value()(d.data);
                  var halos=viz.selection().selectAll(".vz-halo-arc.halo-key_" + viz.haloKey()(d.data));
                  halos.each(function (d) {
                      if (!haloLabels[d.data.key]) {
                          haloLabels[d.data.key]=1;
                          createPacLabel(d.x, d.y,d.data.values[0].CMTE_NM);
                      }
                  })
              });

              //Format the label for the datatip.
              total = d3.format(",.2f")(total);

              //Create and position the datatip
              var rect = d3.selectAll(".vz-halo-arc-plot")[0][0].getBoundingClientRect();

              var node = viz.selection().selectAll(".vz-halo-node.node-key_" + d.key);

              //Create and position the datatip
              var rect = node[0][0].getBoundingClientRect();

              var x = rect.left;
              var y = rect.top + document.body.scrollTop;

              var strSyntax = d.values[0].PTY == 'positive' ? 'Sentiment index: +' : 'Sentiment index: -'

              createDataTip(x + d.r, y + d.r + 25, d.values[0].CAND_ID, d.values[0].CAND_NAME,  strSyntax + total);
          }

          // For each PAC we want to create a datatip that shows the total of all contributions by that PAC
          function arc_onMouseOver(e,d,i) {
              stopAnnimation();

              //Find all links from a PAC and create totals
              var links=viz.selection().selectAll(".vz-halo-link-path.halo-key_" + d.data.key);
              var total=0;
              var num = 0;
              var average = 0;
              links.each(function (d) {
                  num ++;
                  total+= viz.value()(d.data);
              });

              total = d3.format(",.2f")(total);

              average = d3.format(",.2f")(total / num);
              // console.log('number: ' + num);

              //Create and position the datatip
              var rect = d3.selectAll(".vz-halo-node-plot")[0][0].getBoundingClientRect();
              createDataTip(d.x + rect.left  + rect.width/2, (d.y + rect.top + rect.height + 250),"NEWS SOURCE", d.data.values[0].CMTE_NM,"Sentiment index: " + total);
          }

          // When the user rolls over a link we want to create a lable for the PAC and a data tip for the candidate that the
          // contribution went to.
          function link_onMouseOver(e,d,i) {
              stopAnnimation();

              // find the associated candidate and get values for the datatip
              var cand=viz.selection().selectAll(".vz-halo-node.node-key_" + viz.nodeKey()(d.data));
              var datum=cand.datum();
              var total = d3.format(",.2f")(viz.value()(d.data));
              var date = '';
              // var date = d.data.month + "/" + d.data.day + "/" + d.data.year;

              //Create and position the datatip
              var rect = d3.selectAll(".vz-halo-arc-plot")[0][0].getBoundingClientRect();
              createDataTip(datum.x + rect.left + datum.r, datum.y + datum.r + rect.height + rect.top, date, d.data.CAND_NAME,"Sentiment index: " + total);

              //find the pac and create a label for it.
              var pac=viz.selection().selectAll(".vz-halo-arc.halo-key_" + viz.haloKey()(d.data));
              datum=pac.datum();
              createPacLabel(datum.x, datum.y,datum.data.values[0].CMTE_NM);
          }

          //Here is a template for our data tip
          var datatip='<div class="tooltip-halo" style="width: 250px; background-opacity:.5">' +
              // '<div class="header1">HEADER1</div>' +
              // '<div class="header-rule"></div>' +
              '<div class="header2"> HEADER2 </div>' +
              '<div class="header-rule"></div>' +
              '<div class="header3"> HEADER3 </div>' +
              '</div>';

          // This function uses the above html template to replace values and then creates a new <div> that it appends to the
          // document.body.  This is just one way you could implement a data tip.
          function createDataTip(x,y,h1,h2,h3) {

              var html = datatip.replace("HEADER1", h1);
              html = html.replace("HEADER2", h2);
              html = html.replace("HEADER3", h3);

              d3.select("body")
                  .append("div")
                  .attr("class", "vz-halo-label")
                  .style("position", "absolute")
                  .style("top", y + "px")
                  .style("left", (x - 125) + "px")
                  .style("opacity",0)
                  .style("z-index",99999)
                  .html(html)
                  .transition().style("opacity",1);

          }

          // This function creates a highlight label with the PAC name when an associated link or candidate has issued a mouseover
          // event.  It uses properties from the skin to determine the specific style of the label.
          function createPacLabel (x,y,l) {

              var g = viz.selection().selectAll(".vz-halo-arc-plot").append("g")
                  .attr("class","vz-halo-label")
                  .style("pointer-events","none")
                  .style("opacity",0);

              g.append("text")
                  .style("font-size","11px")
                  .style("fill",theme.skin().labelColor)
                  .style("fill-opacity",.75)
                  .attr("text-anchor","middle")
                  .attr("x", x)
                  .attr("y", y)
                  .text(l);

              var rect = g[0][0].getBoundingClientRect();
              g.insert("rect","text")
                  .style("shape-rendering","auto")
                  .style("fill",theme.skin().labelFill)
                  .style("opacity",.45)
                  .attr("width",rect.width+12)
                  .attr("height",rect.height+12)
                  .attr("rx",3)
                  .attr("ry",3)
                  .attr("x", x-5 - rect.width/2)
                  .attr("y", y - rect.height-3);

              g.transition().style("opacity",1);
          }

          // When we mouse out we want to remove all pac datatips and labels.
          function onMouseOut(d,i) {
              scheduleAnnimation();
              d3.selectAll(".vz-halo-label").remove();
          }

          //
          // Functions used by the test container to set various properties of the viz
          //
          function changeSkin(val) {
              if (!val) return;
              theme.skin(val);
              viz.update();
          }

          function changeSize(val) {
              var s = String(val).split(",");
              viz_container.transition().duration(300).style('width', s[0] + 'px').style('height', s[1] + 'px');
              viz.width(Number(s[0])).height(Number(s[1])).update();
              viz_title.attr("x", viz.width() / 2);
              theme.apply();
          }

          var congress="House";
          function changeData(val) {
              congress=val;
              data=dataSource[val];
              viz.data(data).update();
          }

        }
    }

})();

// (function() {
//     'use strict';
//
//     angular
//         .module('app.charts')
//         .directive('haloChart', haloChart);
//
//     haloChart.$inject = ['$rootScope', '$document', '$localStorage'];
//
//     function haloChart($rootScope, $document, $localStorage) {
//
//         var directive = {
//             restrict: 'EA',
//             templateUrl: $rootScope.app.templateDir + 'halo.chart.template.html',
//             scope: {
//                 dataset: '=?'
//             },
//             link: link
//         };
//         return directive;
//
//         function link(scope, element, attrs) {
//
//           var data;           // Holds the currently used data (senate or house)
//           var dataSource={};  // Object holds both senate and house data sources.
//           var delay=3000;
//           var accumSliderSeries = [];
//           var sliderPointer = 0;
//           var sliderStrokeDistance = 6; // distance between 2 strokes
//           var widthStroke = 2;
//           var widthStrokeActive = 2.5;
//           var currentApiData = null;
//           var refreshIntervalId;
//           var distinctGroupKeys = [];
//           var playPause;
//           var currentApiData, running=true;
//
//           var rect, screenWidth, screenHeight, outerRadius,
//               viz, viz_container, viz_title, theme,
//               timeSlider, mGroup, titleEnter, circleEnter, labelEnter,
//               monthEnter, monthUpdate
//               ;
//
//           var vizuly = window.vizuly;
//
//           if (self == top) {
//               rect = $document[0].body.getBoundingClientRect();
//           } else {
//               rect = parent.$document[0].body.getBoundingClientRect();
//           }
//
//           //Set display size based on window size.
//           screenWidth = (rect.width < 960)
//               ? Math.round(rect.width * .95)
//               : Math.round((rect.width - 210) * .95)
//           screenHeight = 600;//Math.min(parent.innerHeight * 0.75, screenWidth);
//           screenWidth = 600;//screenHeight;
//           outerRadius = (screenWidth / 2);
//
//           d3.select(element[0].querySelector('#currentDisplay')).attr("item_value", screenWidth + "," + screenHeight).attr("class", "selected").html("<a>" + screenWidth + "px - " + screenHeight + "px</a>");
//
//           // Set the size of our container element.
//           viz_container = d3.selectAll(element[0].querySelector('#viz_container')).style("width", screenWidth + "px").style("height", screenHeight + "px");
//
//           viz = vizuly.viz.halo_cluster(element[0].querySelector('#viz_container'));
//
//           timeSlider = d3.select(element[0].querySelector('#timeSlider'))
//               .style("width", screenWidth + "px")
//               .style("height", 50 + "px")
//               .style("margin", "0 auto")
//               .append("svg")
//               .attr("class","timeSlider")
//               .style("width", screenWidth + "px")
//               .style("height", 50 + "px")
//               .style("margin", 0 + " auto");
//
//           mGroup = timeSlider.append("g")
//               .style("height", 50 + "px")
//               .style("margin", 10 + " auto")
//               .attr("class","months")
//               .style("cursor","pointer");
//
//           // Draw title and legend
//           var svgInfoChart = d3.select(element[0].querySelector('#infoChart'))
//               .style("width", "100%")
//               .style("height", 90 + "px")
//               .append("svg")
//               .attr("class", "info-chart")
//               .attr("transform", "translate(" + 0 + ","  + 0 + ")")
//               .style("width", "100%")
//               .style("height", 90 + "px")
//               .style("fill", "#000");
//
//           // Legend
//           var cGroup = svgInfoChart.append("g")
//               .attr("class","circles")
//               .style("width", "100%")
//               .attr("transform", "translate(" + 10 + ","  + 45 + ")");
//
//           var dataCircle = [
//               { "x_axis": 0, "y_axis": 0, "radius": 8, "color" : "#4CAF50" },
//               { "x_axis": 0, "y_axis": 25, "radius": 8, "color" : "#F44336" }
//           ];
//
//           var dataLabel = [
//               { label: 'Positive sentiment' },
//               { label: 'Negative sentiment' },
//           ]
//
//           var circleAxis = cGroup.selectAll("g.circle")
//               .data(dataCircle);
//
//           var labelAxis = cGroup.selectAll("g.circle")
//               .data(dataLabel);
//
//           circleEnter = circleAxis.enter();
//
//           labelEnter = labelAxis.enter();
//
//           circleEnter.append("circle")
//               .attr("cx", function(d) {
//                   return d.x_axis;
//               })
//               .attr("cy", function(d) {
//                   return d.y_axis;
//               })
//               .attr("r", function(d) {
//                   return d.radius;
//               })
//               .style("fill", function(d) {
//                   return d.color;
//               });
//
//           labelEnter.append("text")
//               .style("font-size", "14px")
//               .text(function(d) {
//                   return d.label;
//               })
//               .attr("transform", function(d, i) {
//                   return "translate(" + 15 + ","  + ((i === 0) ? 5 : 30) + ")"
//               });
//
//           // D3 formatters we will use for labels
//           var formatDate = d3.time.format("%b %d, 20%y");
//
//           // Set our party colors
//           var repColor="#F44336";
//           var demColor="#4CAF50";
//           // var repColor="#F80018";
//           // var demColor="#0543bc";
//           var otherColor="#FFa400";
//
//           // Create a skin object that has all of the same properties as the skin objects in the /themes/halo.js vizuly file
//           var customSkin = {
//               name: "custom",
//               labelColor: "#FFF",
//               labelFill: "#000",
//               background_transition: function (selection) {
//                   viz.selection().select(".vz-background").transition(1000).style("fill-opacity", 0);
//               },
//               // Here we set the contribution colors based on the party
//               link_stroke: function (d, i) {
//                   return (d.data.PTY == "negative") ? repColor : (d.nodeGroup="positive") ? demColor: otherColor;
//               },
//               link_fill: function (d, i) {
//                   return (d.data.PTY == "negative") ? repColor : (d.nodeGroup="positive") ? demColor: otherColor;
//               },
//               link_fill_opacity:.2,
//               link_node_fill_opacity:.5,
//               node_stroke: function (d, i) {
//                   return "#FFF";
//               },
//               node_over_stroke: function (d, i) {
//                   return "#FFF";
//               },
//               // Here we set the candidate colors based on the party
//               node_fill: function (d, i) {
//                   return (d.nodeGroup == "negative") ? repColor : (d.nodeGroup=="positive") ? demColor: otherColor;
//               },
//               arc_stroke: function (d, i) {
//                   return "#FFF";
//               },
//               // Here we set the arc contribution colors based on the party
//               arc_fill: function (d, i) {
//                   return (d.data.PTY == "negative") ? repColor : (d.nodeGroup=="positive") ? demColor: otherColor;
//               },
//               arc_over_fill: function (d, i) {
//                   return "#000";
//               },
//               class: "vz-skin-political-influence-no"
//           };
//
//           playPause = $('#playPause');
//
//           playPause.on('click',stopStart);
//
//           function stopStart() {
//               if (running==true) {
//                   running=false;
//                   stopAnnimation();
//                   playPause.attr('src', 'app/img/play_bw.png');
//               }
//               else {
//                   running=true;
//                   playPause.attr('src', 'app/img/pause_bw.png');
//                   scheduleAnnimation();
//               }
//           }
//
//           loadData();
//
//           function loadData() {
//
//               fetchData(function(tmpDataApi) {
//                   buildSliderSeries(tmpDataApi);
//
//                   var updating = false;
//                   if (updating) {
//                       return;
//                   }
//                   updating = true;
//
//                   if (!parseDataAndUpdate(tmpDataApi)) {
//                       clearInterval(refreshIntervalId);
//                       loadData();
//                   } else {
//                       updating = false;
//                       scheduleAnnimation();
//                   }
//               });
//           }
//
//           function fetchData(callback) {
//               var tmpDataApi = [];
//
//               if (!$rootScope.app.haloApiData) {
//                 var url = 'http://watson.wtst.io/sentiments/states?count=40&threshold=0.02&tickers=AAPL,AMZN,FB,GOOGL,NFLX,NVDA,PCLN,TSLA,TRIP,SRCL,AMAT,AMGN,AMZN,ATVI,AVGO,BBBY,BIDU,BIIB,BMRN,CA,CTSH,CTXS,DISCA,DISCK,DISH,DLTR,EA,EBAY,ENDP,ESRX,LRCX,LVNTA,MAR,MAT,MDLZ,MNST,MSFT,MU,MXIM,MYL';
//                 $.ajax({
//                     url: url,
//                     method: 'GET'
//                 }).success(function (response) {
//                   tmpDataApi = response;
//                   $localStorage.haloData = tmpDataApi;
//
//                   if (callback) {
//                       callback(tmpDataApi);
//                   }
//                 }).fail(function () {
//                     console.log('Fail to get data from api: ' + url);
//                 });
//               } else {
//                 tmpDataApi = $rootScope.app.haloApiData
//                 if (callback) {
//                     callback(tmpDataApi);
//                 }
//               }
//           }
//
//           function parseDataAndUpdate(tmpDataApi) {
//               if (parseData(tmpDataApi, sliderPointer) === null) {
//                   return false;
//               } else {
//                   if (!sliderPointer) {
//                       currentApiData = tmpDataApi;
//                   } else {
//                       tmpDataApi[sliderPointer] = currentApiData[sliderPointer-1];
//                   }
//
//                   update(parseData(tmpDataApi, sliderPointer));
//                   return true;
//               }
//           }
//
//           function parseData(source, index) { // zero base index of item index
//
//               let dataIndex = index;
//               let arr = source[dataIndex];
//               let internalData = [];
//
//               if (dataIndex < source.length) {
//                 for (let i = 0; i < arr.length; i++) {
//                   let item = {
//                       CAND_ID: arr[i][0], // "IRBT"
//                       CAND_NAME: arr[i][0], // "IRBT"
//                       CMTE_ID: arr[i][1].replace(/[\. ]/g, '_'), // "www.broadcastnewsroom.com"
//                       CMTE_NM: arr[i][1], // "www.broadcastnewsroom.com"
//                       Key: arr[i][3], // "K0"
//                       PTY: (arr[i][2] > 0 ? 'positive' : 'negative'), // "positive"
//                       TRANSACTION_AMT: arr[i][2] // "0.923376024"
//                   };
//                   internalData.push(item);
//                 }
//
//                 for (let j = 0; j < internalData.length; j++) {
//                   for (let z = 0; z < internalData.length; z++) {
//                     if (internalData[j].CAND_NAME === internalData[z].CAND_NAME) {
//                       if (internalData[j].TRANSACTION_AMT < 0) {
//                         internalData[j].CAND_ID = '_' + internalData[j].CAND_ID;
//                       }
//                       if (internalData[z].TRANSACTION_AMT < 0) {
//                         internalData[z].CAND_ID = '_' + internalData[z].CAND_ID;
//                       }
//                     }
//                   }
//                 }
//
//                 // internalData = internalData.slice(0, 10);
//                 return internalData;
//               }
//               return null;
//           }
//
//           function scheduleAnnimation() {
//               if (!currentApiData) {
//                   return;
//               }
//               refreshIntervalId = setInterval(function() {
//                   // shiftRight();
//                   // console.log('refreshInterval: ' + refreshIntervalId);
//                   update(parseData(currentApiData, sliderPointer));
//               }, delay);
//           }
//           function stopAnnimation() {
//               if (refreshIntervalId) {
//                   clearInterval(refreshIntervalId);
//               }
//           }
//           function shiftRight() {
//               var lastItem = distinctGroupKeys[distinctGroupKeys.length - 1];
//               for (var i = distinctGroupKeys.length - 1; i >= 1; i--) {
//                   distinctGroupKeys[i] = distinctGroupKeys[i - 1];
//               }
//               distinctGroupKeys[0] = lastItem;
//
//               var shiftedData = [];
//               for (var i = 0; i < distinctGroupKeys.length; i++) {
//                   for (var j = 0; j < data.length; j++) {
//                       if (data[j].CMTE_ID == distinctGroupKeys[i]) {
//                           shiftedData.push(data[j]);
//                       }
//                   }
//               }
//               data = shiftedData;
//           }
//
//           //Initializes chart and container.
//           function update(data) {
//
//             // console.log('sliderPointer: ' + sliderPointer);
//
//               updateSliders(sliderPointer++);
//               if (sliderPointer === accumSliderSeries.length) {
//                   sliderPointer = 0;
//               }
//
//               viz.data(data)
//                   .width(800).height(600)                     // Initial display size
//                   .haloKey(function (d) {
//                       return d.CMTE_ID; })                    // The property that determines each PAC
//                   .nodeKey(function (d) {
//                       return d.CAND_ID; })                    // The property that determines Candidate
//                   .nodeGroupKey(function (d) {
//                       return d.PTY; })                        // The property that determines candidate Party affiliation
//                   .value(function (d) {
//                       return Math.abs(Number(d.TRANSACTION_AMT)); })            // The property that determines the weight/size of the link path
//                   .on("update", onUpdate)                     // Callback for viz update
//                   .on("nodeover",node_onMouseOver)            // Callback for mouseover on the candidates
//                   .on("nodeout",onMouseOut)                   // Callback for mouseout on from the candidate
//                   .on("arcover",arc_onMouseOver)              // Callback for mouseover on each PAC
//                   .on("arcout",onMouseOut)                    // Callback for mouseout on each PAC
//                   .on("linkover",link_onMouseOver)            // Callback for mousover on each contribution
//                   .on("linkout",onMouseOut)                   // Callback for mouseout on each contribution
//                   .on("nodeclick",node_onClick)
//
//               theme = vizuly.theme.halo(viz);
//
//               theme.skins()["custom"]=customSkin;
//               theme.skin("custom");
//
//               viz_title = viz.selection().select("svg").append("text").attr("class", "title")
//                   .style("font-family","Raleway")
//                   .attr("x", viz.width() / 2).attr("y", 40).attr("text-anchor", "middle").style("font-weight",300).text("");
//
//               //Update the size of the component
//               changeSize(d3.select("#currentDisplay").attr("item_value"));
//           }
//
//           function buildSliderSeries(apiData) { // data from API
//               if (!apiData) {
//                   return;
//               }
//
//               var countSliderPoints = function (dataFromApi) {
//                   return dataFromApi.length; // first item is for naming
//               };
//
//               var buildPoint = function(index) {
//                   return {
//                       index: index,
//                       xAxisLabel: '',
//                       peakLabel: ''
//                   };
//               };
//
//               accumSliderSeries = [];
//               for (var i = 0; i < countSliderPoints(apiData); i++) {
//                   accumSliderSeries.push(buildPoint(i))
//               }
//
//               if ((accumSliderSeries.length - 1) * sliderStrokeDistance > screenWidth) {
//                   sliderStrokeDistance = 3;
//                   widthStroke = 1;
//                   widthStrokeActive = 1.5;
//               }
//               if ((accumSliderSeries.length - 1) > 200) {
//                   sliderStrokeDistance = 2;
//                   widthStroke = 0.75;
//                   widthStrokeActive = 1;
//               }
//               var sliderWidth = sliderStrokeDistance * accumSliderSeries.length;
//               mGroup.attr("transform", "translate(" + (outerRadius - sliderWidth/2) + ","  + 20 + ")");
//               sliderPointer = 0;
//           }
//
//           // Time slider
//           function updateSliders(currentIndex) {
//               function getStrokeY1(ordinalFromCurrent) {
//                   if (ordinalFromCurrent == 0)
//                       return 0;
//                   else if (ordinalFromCurrent == 1)
//                       return 4;
//                   else if (ordinalFromCurrent == 2)
//                       return 8;
//                   else if (ordinalFromCurrent == 3)
//                       return 11;
//                   else if (ordinalFromCurrent == 4)
//                       return 14;
//                   else if (ordinalFromCurrent == 5)
//                       return 15;
//                   else if (ordinalFromCurrent == 6)
//                       return 15;
//                   else
//                       return 16;
//               }
//               function getOpacityFromCurrent(ordinalFromCurrent) {
//                   if (ordinalFromCurrent == 0)
//                       return 1;
//                   else if (ordinalFromCurrent == 1)
//                       return .9;
//                   else if (ordinalFromCurrent == 2)
//                       return .8;
//                   else if (ordinalFromCurrent == 3)
//                       return .7;
//                   else if (ordinalFromCurrent == 4)
//                       return .6;
//                   else if (ordinalFromCurrent == 5)
//                       return .5;
//                   else if (ordinalFromCurrent == 6)
//                       return .4;
//                   else
//                       return .4;
//               }
//
//               var maxHeight = 22;
//
//               var monthAxis = mGroup.selectAll("g.month")
//                   .data(accumSliderSeries);
//
//               monthEnter = monthAxis.enter()
//                   .append("g")
//                   .attr("class", "month");
//
//               // draw a vertical line
//               // (x1, y1) top, (x2, y2) bottom. x1 = x2
//               monthEnter.append("line")
//                   .attr("x1", function (dataAtI, i) {
//                       return i * sliderStrokeDistance;
//                   })
//                   .attr("x2", function (dataAtI, i) {
//                       return i * sliderStrokeDistance;
//                   })
//                   .attr("y1", function (dataAtI, i) {
//                       var ordinalFromCurrent = Math.abs(currentIndex - i);
//                       return getStrokeY1(ordinalFromCurrent);
//                   })
//                   .attr("y2", maxHeight)
//                   .attr("shape-rendering", "crispEdges")
//                   .attr('stroke-width', widthStroke)
//                   .style("stroke-opacity", function (d, i) {
//                       var ordinalFromCurrent = Math.abs(currentIndex - i);
//                       return getOpacityFromCurrent(ordinalFromCurrent);
//                   })
//                   .style("stroke", "#000")
//                   .on("click", function (d) {
//                       sliderPointer = d.index;
//                       parseDataAndUpdate(currentApiData);
//                   });
//
//
//               // top text
//               monthEnter.append("text")
//                   .attr("transform", function (dataAtI, i) {
//                       return "translate (" + String(i * sliderStrokeDistance - 10) + ", -3)";
//                   })
//                   .text(function (dataAtI, i) {
//                       return dataAtI.peakLabel;
//                   })
//                   .style("fill-opacity", function (d, i) {
//                       return 0; // hide by default, will be delay-shown latter
//                   });
//
//               // bottom text
//               monthEnter.append("text")
//                   .attr("transform", function (dataAtI, i) {
//                       return "translate (" + (i * sliderStrokeDistance - 10) + ",33)";
//                   })
//                   .text(function (dataAtI, i) {
//                       return dataAtI.xAxisLabel + '';
//                   });
//
//               monthUpdate = monthAxis.transition();
//
//               // show/hide text
//               monthUpdate.select("text")
//                   .delay(delay / 2)
//                   .style("fill-opacity", function (d) {
//                       if (d.index == currentIndex) {
//                           return 1;
//                       }
//                       return 0;
//                   });
//
//               monthUpdate.select("line")
//                   .delay(delay / 2)
//                   .attr("y1", function (d, i) {
//                       var ordinalFromCurrent = Math.abs(currentIndex - i);
//                       return getStrokeY1(ordinalFromCurrent);
//                   })
//                   .style("stroke-width", function (d, i) {
//                       if (i == currentIndex) {
//                           return widthStrokeActive;
//                       }
//                       return widthStroke;
//                   })
//                   .style("stroke-opacity", function (d, i) {
//                       var ordinalFromCurrent = Math.abs(currentIndex - i);
//                       return getOpacityFromCurrent(ordinalFromCurrent);
//                   })
//                   .style("stroke", "#000");
//
//           }
//
//           // Each time the viz is updated we adjust our title color
//           // Do a little tweak for our custom skin.
//           function onUpdate() {
//               viz_title.style("fill", (theme.skin() != customSkin) ? theme.skin().labelColor : "#000");
//           }
//
//           // An example of how you could respond to a node click event
//           function node_onClick(e,d,i) {
//               console.log("You have just clicked on " + d.values[0].CAND_NAME);
//           }
//
//           // For each mouse over on the node we want to create a datatip that shows information about the candidate
//           // and any assoicated PACs that have contributed to the candidate.
//           function node_onMouseOver(e,d,i) {
//               stopAnnimation();
//
//               //Find all node links (candidates) and create a label for each arc
//               var haloLabels={};
//               var links=viz.selection().selectAll(".vz-halo-link-path.node-key_" + d.key);
//               var total=0;
//
//               //For each link we want to dynamically total the transactions to display them on the datatip.
//               links.each(function (d) {
//                   total+= viz.value()(d.data);
//                   var halos=viz.selection().selectAll(".vz-halo-arc.halo-key_" + viz.haloKey()(d.data));
//                   halos.each(function (d) {
//                       if (!haloLabels[d.data.key]) {
//                           haloLabels[d.data.key]=1;
//                           createPacLabel(d.x, d.y,d.data.values[0].CMTE_NM);
//                       }
//                   })
//               });
//
//               //Format the label for the datatip.
//               total = d3.format(",.0f")(total);
//
//               //Create and position the datatip
//               var rect = d3.selectAll(".vz-halo-arc-plot")[0][0].getBoundingClientRect();
//
//               var node = viz.selection().selectAll(".vz-halo-node.node-key_" + d.key);
//
//               //Create and position the datatip
//               var rect = node[0][0].getBoundingClientRect();
//
//               var x = rect.left;
//               var y = rect.top + document.body.scrollTop;
//
//               var strSyntax = d.values[0].PTY == 'positive' ? 'Sentiment index: +' : 'Sentiment index: -'
//
//               createDataTip(x + d.r, y + d.r + 25, d.values[0].CAND_ID, d.values[0].CAND_NAME,  strSyntax + total);
//           }
//
//           // For each PAC we want to create a datatip that shows the total of all contributions by that PAC
//           function arc_onMouseOver(e,d,i) {
//               stopAnnimation();
//
//               //Find all links from a PAC and create totals
//               var links=viz.selection().selectAll(".vz-halo-link-path.halo-key_" + d.data.key);
//               var total=0;
//               var num = 0;
//               var average = 0;
//               links.each(function (d) {
//                   num ++;
//                   total+= viz.value()(d.data);
//               });
//
//               total = d3.format(",.0f")(total);
//
//               average = d3.format(",.0f")(total / num);
//               // console.log('number: ' + num);
//
//               //Create and position the datatip
//               var rect = d3.selectAll(".vz-halo-node-plot")[0][0].getBoundingClientRect();
//               createDataTip(d.x + rect.left  + rect.width/2, (d.y + rect.top + rect.height + 100),"NEWS SOURCE", d.data.values[0].CMTE_NM,"Sentiment index: " + total);
//           }
//
//           // When the user rolls over a link we want to create a lable for the PAC and a data tip for the candidate that the
//           // contribution went to.
//           function link_onMouseOver(e,d,i) {
//               stopAnnimation();
//
//               // find the associated candidate and get values for the datatip
//               var cand=viz.selection().selectAll(".vz-halo-node.node-key_" + viz.nodeKey()(d.data));
//               var datum=cand.datum();
//               var total = d3.format(",.0f")(viz.value()(d.data));
//               var date = '';
//               // var date = d.data.month + "/" + d.data.day + "/" + d.data.year;
//
//               //Create and position the datatip
//               var rect = d3.selectAll(".vz-halo-arc-plot")[0][0].getBoundingClientRect();
//               createDataTip(datum.x + rect.left + datum.r, datum.y + datum.r + rect.height/2 + rect.top, date, d.data.CAND_NAME,"Sentiment index: " + total);
//
//               //find the pac and create a label for it.
//               var pac=viz.selection().selectAll(".vz-halo-arc.halo-key_" + viz.haloKey()(d.data));
//               datum=pac.datum();
//               createPacLabel(datum.x, datum.y,datum.data.values[0].CMTE_NM);
//           }
//
//           //Here is a template for our data tip
//           var datatip='<div class="tooltip-halo" style="width: 250px; background-opacity:.5">' +
//               // '<div class="header1">HEADER1</div>' +
//               // '<div class="header-rule"></div>' +
//               '<div class="header2"> HEADER2 </div>' +
//               '<div class="header-rule"></div>' +
//               '<div class="header3"> HEADER3 </div>' +
//               '</div>';
//
//           // This function uses the above html template to replace values and then creates a new <div> that it appends to the
//           // document.body.  This is just one way you could implement a data tip.
//           function createDataTip(x,y,h1,h2,h3) {
//
//               var html = datatip.replace("HEADER1", h1);
//               html = html.replace("HEADER2", h2);
//               html = html.replace("HEADER3", h3);
//
//               d3.select("body")
//                   .append("div")
//                   .attr("class", "vz-halo-label")
//                   .style("position", "absolute")
//                   .style("top", y + "px")
//                   .style("left", (x - 125) + "px")
//                   .style("opacity",0)
//                   .style("z-index",99999)
//                   .html(html)
//                   .transition().style("opacity",1);
//
//           }
//
//           // This function creates a highlight label with the PAC name when an associated link or candidate has issued a mouseover
//           // event.  It uses properties from the skin to determine the specific style of the label.
//           function createPacLabel (x,y,l) {
//
//               var g = viz.selection().selectAll(".vz-halo-arc-plot").append("g")
//                   .attr("class","vz-halo-label")
//                   .style("pointer-events","none")
//                   .style("opacity",0);
//
//               g.append("text")
//                   .style("font-size","11px")
//                   .style("fill",theme.skin().labelColor)
//                   .style("fill-opacity",.75)
//                   .attr("text-anchor","middle")
//                   .attr("x", x)
//                   .attr("y", y)
//                   .text(l);
//
//               var rect = g[0][0].getBoundingClientRect();
//               g.insert("rect","text")
//                   .style("shape-rendering","auto")
//                   .style("fill",theme.skin().labelFill)
//                   .style("opacity",.45)
//                   .attr("width",rect.width+12)
//                   .attr("height",rect.height+12)
//                   .attr("rx",3)
//                   .attr("ry",3)
//                   .attr("x", x-5 - rect.width/2)
//                   .attr("y", y - rect.height-3);
//
//               g.transition().style("opacity",1);
//           }
//
//           // When we mouse out we want to remove all pac datatips and labels.
//           function onMouseOut(d,i) {
//               scheduleAnnimation();
//               d3.selectAll(".vz-halo-label").remove();
//           }
//
//           //
//           // Functions used by the test container to set various properties of the viz
//           //
//           function changeSkin(val) {
//               if (!val) return;
//               theme.skin(val);
//               viz.update();
//           }
//
//           function changeSize(val) {
//               var s = String(val).split(",");
//               viz_container.transition().duration(300).style('width', s[0] + 'px').style('height', s[1] + 'px');
//               viz.width(Number(s[0])).height(Number(s[1])).update();
//               viz_title.attr("x", viz.width() / 2);
//               theme.apply();
//           }
//
//           var congress="House";
//           function changeData(val) {
//               congress=val;
//               data=dataSource[val];
//               viz.data(data).update();
//           }
//
//         }
//     }
//
// })();

(function() {
    'use strict';


  const SOURCE_INDEX = 1;
  const SCORE_INDEX = 2;
  const DATA_ROW_OFFSET = 2;
  const AVG_VALUES_INDEX = 1;

  var prepareOrbData = (rawData) => {

    var orbData = [];
    var orbHeaders = [];

    //step 1 : preparing the heading row
    var singleOrbHeader = rawData[0][0][SOURCE_INDEX];
    orbHeaders.push(singleOrbHeader);
    for (let tickerState of rawData) {
      for (let aRecord of tickerState) {
        if (singleOrbHeader != aRecord[SOURCE_INDEX]) {
          orbHeaders.push(aRecord[SOURCE_INDEX]);
          singleOrbHeader = aRecord[SOURCE_INDEX];
        }
      }
    }
    orbData.push ( orbHeaders);

    //step 2 : preparing state rows with zero values
    for (var index = 0; index < (rawData.length+1); index +=1) {
      var stateRow = [];
      for (var i=0;i<orbHeaders.length; i +=1) {
        stateRow.push(0);
      }
      orbData.push ( stateRow);
    }

    //step 3 : putting proper values to orb data
    for (var headerIndex = 0; headerIndex < orbHeaders.length; headerIndex += 1) {
      var source = orbHeaders[headerIndex];
      for (var stateIndex = 0; stateIndex < rawData.length; stateIndex += 1) {
        var rawState = rawData[stateIndex];
        for (let stateItem of rawState) {
          if (source == stateItem[SOURCE_INDEX]) {
            orbData[stateIndex + DATA_ROW_OFFSET][headerIndex] = stateItem[SCORE_INDEX];
          }
        }
      }
    }

    //step 4 : calculating average values and putting them to proper data row of orb data
    for (var headerIndex = 0; headerIndex < orbHeaders.length; headerIndex += 1) {
      var valuesCnt = 0;
      var sum = 0;
      for (var orbDataIndex = DATA_ROW_OFFSET; orbDataIndex < orbData.length ; orbDataIndex +=1) {
        if (orbData[orbDataIndex][headerIndex] != 0) {
          valuesCnt +=1;
          sum += orbData[orbDataIndex][headerIndex];
        }
      }
      orbData[AVG_VALUES_INDEX][headerIndex]  = (valuesCnt > 0) ? sum/valuesCnt:0;

    }

    return orbData;

  };

    angular
        .module('app.charts')
        .directive('orbChart', orbChart);

    orbChart.$inject = ['$rootScope', '$document'];

    function orbChart($rootScope, $document) {

        var directive = {
            restrict: 'EA',
            templateUrl: $rootScope.app.templateDir + 'orb.chart.template.html',
            scope: {
                dataset: '=?',
                ticker: '=?'
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs) {

            scope.$on('$destroy', function() {
              if (refreshIntervalId) {
                clearInterval(refreshIntervalId);
              }
              d3.selectAll("svg > *").remove();
              d3.select("#svgDiv").selectAll("svg").remove();
            });

            var maxWidth = 900;
            // var maxWidth = Math.max(900, Math.min(window.innerWidth, window.innerHeight) - 50); //TODO

            var outerRadius = (maxWidth / 2),
                innerRadius = outerRadius - 170,
                // maxSliderWidth=Math.max(600,(innerRadius*2)-250);
                maxSliderWidth = (outerRadius - 50) * 2;

            var itemCountPerApiCall = 40;

            var iText, iChords, eText, eChords;

            var angleRange = 320,
                baseYear = 2001,
                maxMonth = 1,
                maxYear = 12,
                monthOffset = (maxSliderWidth) / (maxYear * 12 + maxMonth),
                countries,
                e_labels = [],
                e_chords = [],
                i_labels = [],
                i_chords = [],
                topCountryCount = 20,
                e_buf_indexByName = {},
                e_indexByName = {},
                e_nameByIndex = {},
                i_indexByName = {},
                i_nameByIndex = {},
                i_buf_indexByName = {},
                export_countries = [],
                import_countries = [],
                e_colorByName = {},
                i_colorByName = {},
                months = [],
                monthlyExports = [],
                monthlyImports = [],
                countriesGrouped,
                delay = 2000,
                refreshIntervalId = undefined,
                year = 0,
                month = -1,
                running = true,
                formatNumber = d3.format(",.0f"),
                formatCurrency = function(d) {
                    return "-$" + formatNumber(d)
                },
                eTextUpdate,
                eChordUpdate,
                TextUpdate,
                iChordUpdate,
                titleEnter,
                circleEnter,
                labelEnter,
                gradientGroup,
                ticker,
                monthEnter,
                monthUpdate,
                preparedData;

            var toolTip = d3.select(document.getElementById("toolTip-orb"));
            var header = d3.select(document.getElementById("head"));
            var header1 = d3.select(document.getElementById("header1"));
            var header2 = d3.select(document.getElementById("header2"));

            var e_fill = d3.scale.ordinal().range(["#1B5E20", "#388E3C", "#4CAF50", "#81C784", "#C8E6C9"]);
            var i_fill = d3.scale.ordinal().range(["#B71C1C", "#D32F2F", "#F44336", "#E57373", "#FFCDD2"]);

            var monthsMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            d3.select(document.getElementById("bpg"))
                .style("min-width", (outerRadius * 2) + "px");


            var playPause = d3.select(document.getElementById("playPause"));

            d3.select(document.getElementById("imgDiv"))
                .style("left", ((outerRadius - maxSliderWidth / 2)) + "px");

            var svg = d3.select(document.getElementById("svgDiv"))
                .style("width", (outerRadius * 2) + "px")
                .style("height", (outerRadius * 2 + 100) + "px")
                .append("svg")
                .attr("id", "svg")
                .style("overflow", "visible")
                .style("width", (outerRadius * 2) + "px")
                .style("height", (outerRadius * 2 + 100) + "px");

            var timeSlider = d3.select(element[0].querySelector('#timeSlider'))
                .style("width", (outerRadius * 2) + "px")
                .style("height", 50 + "px")
                .style("margin", "0 auto")
                .append("svg")
                .attr("class","timeSlider")
                .style("width", (outerRadius * 2) + "px")
                .style("height", 50 + "px")
                .style("margin", 0 + " auto");

            var mGroup = timeSlider.append("g")
                .style("height", 50 + "px")
                .style("margin", 10 + " auto")
                .attr("class","months")
                .style("cursor","pointer");

            // Region legend chart

            // Draw title and legend
            var svgInfoChart = d3.select(document.getElementById("infoChart"))
                .style("width", "100%")
                .style("height", "300px")
                .append("svg")
                .attr("class", "info-chart")
                .attr("transform", "translate(" + 0 + "," + 50 + ")")
                .style("width", "100%")
                .style("height", "300px")
                .style("fill", "#000");

            // Title
            var tGroup = svgInfoChart.append("g")
                .attr("class", "title-chart")
                .attr("transform", "translate(" + 0 + "," + 28 + ")")
                .style("height", "50px");

            var dataTitle = [{
                title: 'Top 40 sentiment influencers'
            }];

            var titleAxis = tGroup.selectAll("g.title")
                .data(dataTitle);

            titleEnter = titleAxis.enter();

            titleEnter.append("text")
                .style("font-size", "14px")
                .text(function(d) {
                    return d.title;
                });

            // Legend
            var cGroup = svgInfoChart.append("g")
                .attr("class", "circles")
                .style("width", "100%")
                .attr("transform", "translate(" + 10 + "," + 60 + ")");

            var dataCircle = [
                { "x_axis": 0, "y_axis": 0, "radius": 8, "color" : "#4CAF50" },
                { "x_axis": 0, "y_axis": 25, "radius": 8, "color" : "#F44336" }
            ];

            var dataLabel = [{
                label: 'positive sentiment'
            }, {
                label: 'negative sentiment'
            }, ]

            var circleAxis = cGroup.selectAll("g.circle")
                .data(dataCircle);

            var labelAxis = cGroup.selectAll("g.circle")
                .data(dataLabel);

            circleEnter = circleAxis.enter();

            labelEnter = labelAxis.enter();

            circleEnter.append("circle")
                .attr("cx", function(d) {
                    return d.x_axis;
                })
                .attr("cy", function(d) {
                    return d.y_axis;
                })
                .attr("r", function(d) {
                    return d.radius;
                })
                .style("fill", function(d) {
                    return d.color;
                });

            labelEnter.append("text")
                .style("font-size", "14px")
                .text(function(d) {
                    return ' - ' + d.label;
                })
                .attr("transform", function(d, i) {
                    return "translate(" + 15 + "," + ((i === 0) ? 5 : 30) + ")"
                });

            // End region legend chart

            var export_chord = d3.layout.arc_chord()
                .padding(.05)
                .sortSubgroups(d3.descending)
                .sortChords(d3.descending)
                .yOffsetFactor(-0.8);

            var import_chord = d3.layout.arc_chord()
                .padding(.05)
                .yOffsetFactor(0.7)
                .sortSubgroups(d3.descending)
                .sortChords(d3.descending);

            var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(innerRadius + 5);


            var dGroup = svg.append("g")
                .attr("class", "mainLabel");

            dGroup.append("text")
                .attr("class", "mainLabel")
                .attr("transform", "translate(" + (outerRadius - 20) + "," + (outerRadius + 30) + ")")
                .style("font-size", "0px");

            var gY = (outerRadius - (innerRadius * .8 / 2));

            gradientGroup = svg.append("g")
                .attr("class", "gradient")
                .attr("transform", "translate(" + (outerRadius - 6) + "," + (gY + 70) + ")");

            var gradient2 = svg.append("defs")
              .append("linearGradient")
                .attr("id", "gradient2")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

            gradient2.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", "#4CAF50")
                .attr("stop-opacity", 1);

            gradient2.append("stop")
                .attr("offset", "40%")
                .attr("stop-color", "#FFFFFF")
                .attr("stop-opacity", 0);

            gradient2.append("stop")
                .attr("offset", "60%")
                .attr("stop-color", "#FFFFFF")
                .attr("stop-opacity", 0);

            gradient2.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", "#F44336")
                .attr("stop-opacity", 1);

            gradientGroup.append("rect")
                .attr("height", ((outerRadius + innerRadius * .7 / 2) - gY))
                .attr("width", 0)
                .style("fill", "url(#gradient2)");

            var sGroup = svg.append("g")
                .attr("class", "sliders")
                .style("cursor", "pointer")
                .attr("transform", "translate(" + (outerRadius - maxSliderWidth / 2 - 20) + "," + 20 + ")");

            var coGroup = svg.append("g")
                .attr("class", "company-info");

            var eGroup = svg.append("g")
                .attr("class", "exports")
                .attr("transform", "translate(" + outerRadius + "," + (outerRadius + 70) + ")");

            var iGroup = svg.append("g")
                .attr("class", "imports")
                .attr("transform", "translate(" + outerRadius + "," + (outerRadius + 70) + ")");

            initialize();

            if (scope.ticker) {
              ticker = scope.ticker;
            } else {
              ticker = 'AAPL';
            }

            function refresh() {
                fetchData(ticker, function(data) {
                    buildSliderSeries(data);

                    var updating = false;
                    setTimeout(function() {
                        updateCompany(getIconLogo(ticker));
                    }, delay + 600);
                    refreshIntervalId = setInterval(function() {
                        // console.log('refreshInterval: ' + refreshIntervalId);
                        if (updating) {
                            return;
                        }
                        updating = true;

                        if (!parseDataAndUpdate(data)) {
                            clearInterval(refreshIntervalId);
                            refresh();
                        } else {
                            updating = false;
                        }
                    }, delay);
                });
            }

            refresh();

            function getIconLogo(ticker) {
                var company_info = {
                    icon: '',
                    name: ''
                };
                switch (ticker) {
                    case 'AMZN':
                        company_info.icon = 'app/img/orb-icon/amazon.png';
                        company_info.name = 'Amazon - AMZN';
                        break;
                    case 'AAPL':
                        company_info.icon = 'app/img/orb-icon/apple.png';
                        company_info.name = 'Apple Inc. (AAPL)';
                        break;
                    case 'FB':
                        company_info.icon = 'app/img/orb-icon/fb.png';
                        company_info.name = 'Facebook - FB';
                        break;
                    case 'GOOGL':
                        company_info.icon = 'app/img/orb-icon/google.png';
                        company_info.name = 'Google - GOOGL';
                        break;
                    case 'GRPN':
                        company_info.icon = 'app/img/orb-icon/groupon.png';
                        company_info.name = 'Groupon - GRPN';
                        break;
                    case 'NFLX':
                        company_info.icon = 'app/img/orb-icon/netflix.png';
                        company_info.name = 'Netflix - NFLX';
                        break;
                    case 'NVDA':
                        company_info.icon = 'app/img/orb-icon/nvidia.png';
                        company_info.name = 'Nvidia - NVDA';
                        break;
                    case 'PCLN':
                        company_info.icon = 'app/img/orb-icon/pcln.png';
                        company_info.name = 'Priceline Group - PCLN';
                        break;
                    case 'TSLA':
                        company_info.icon = 'app/img/orb-icon/tesla.png';
                        company_info.name = 'Tesla - TSLA';
                        break;
                }

                return company_info;
            }

            function initialize() {
                gradientGroup.transition()
                    .select("rect")
                    .delay(delay * 1.5)
                    .attr("width", 12);

                dGroup.transition()
                    .selectAll("text")
                    .delay(delay * 1.5)
                    .style("font-size", "10px");
            }

            playPause.on("click", stopStart);

            function stopStart() {
                if (running == true) {
                    running = false;
                    clearInterval(refreshIntervalId);
                    playPause.attr('src', 'app/img/play_bw.png');
                    eChords.interrupt();
                    iChords.interrupt();
                    iText.interrupt();
                    eText.interrupt();
                } else {
                    running = true;
                    playPause.attr('src', 'app/img/pause_bw.png');
                    refreshIntervalId = setInterval(function() {
                        var updating = false;
                        if (updating) {
                            return;
                        }
                        updating = true;

                        if (!parseDataAndUpdate(currentApiData)) {
                            clearInterval(refreshIntervalId);
                            refresh();
                        } else {
                            updating = false;
                        }
                    }, delay);
                }
            }

            function node_onMouseOver(d) {
                var t;
                if (typeof d.imports === 'undefined') {
                    t = "Score: " + Number(d.exports);
                } else {
                    t = "Score: " + Number(d.imports);
                }
                toolTip.transition()
                    .duration(200)
                    .style("opacity", ".9");
                header.text((d.index + 1) + ". " + d.label);
                // header1.text(monthsMap[month] + " " + (baseYear+year));
                header2.text(t);
                toolTip.style("left", (d3.event.pageX/2) + "px")
                    .style("top", (d3.event.pageY/2) + "px");
            }

            function node_onMouseOut(d) {

                toolTip.transition() // declare the transition properties to fade-out the div
                    .duration(500) // it shall take 500ms
                    .style("opacity", "0"); // and go all the way to an opacity of nil

            }
            /** Returns an event handler for fading a given chord group. */
            function fade(opacity) {

                return;

                return function(g, i) {
                    svg.selectAll("path.chord")
                        .filter(function(d) {
                            //  return true;
                            return d.source.index != i && d.target.index != i;
                        })
                        .transition()
                        .style("opacity", opacity);
                };
            }

            function fetchData(ticker, callback) {
                var url = "http://watson.wtst.io/sentiments/states?count=40&threshold=0.002&tickers=" + ticker;

                $.ajax({
                    url: url,
                    method: 'GET'
                }).success(function(response) {
                    if (callback) {
                        preparedData =  prepareOrbData(response);
                        callback(preparedData);
                    }
                }).fail(function() {
                    console.log('Fail to get data from api: ' + url)
                });
            }

            function transform(data) {
                var transformed = {};
                transformed.positive = [];
                transformed.negative = [];
                for (var i = 0; i < data.sentiments.length; i++) {
                    var item = {};
                    item.sid = data.sentiments[i].name;
                    item.score = data.sentiments[i].score;

                    if (data.sentiments[i].score < 0) {
                        transformed.negative.push(item);
                    } else {
                        transformed.positive.push(item);
                    }
                }
                return transformed;
            }

            function parseData(source, index) { // zero base index of item index
                var data = {
                    sentiments: []
                };

                // first source ([0]) is for naming
                var dataIndex = index + 1;

                if (dataIndex < source.length) {
                    for (var i = 0; i < source[0].length; i++) {
                        var sentimentItem = {
                            score: '',
                            name: ''
                        };
                        sentimentItem.name = source[0][i];
                        if (source[dataIndex][i] !== 0) {
                            sentimentItem.score = 5 * source[dataIndex][i];
                        } else {
                            sentimentItem.score = source[1][i];
                        }
                        data.sentiments.push(sentimentItem);
                    }

                    return transform(data);
                }
                return null;
            }

            function buildChords(data) {
                var postives = data.positive;
                var negatives = data.negative;

                var negative_matrix = [],
                    positive_matrix = [];

                e_buf_indexByName = e_indexByName;
                i_buf_indexByName = i_indexByName;

                e_indexByName = [];
                e_nameByIndex = [];
                i_indexByName = [];
                i_nameByIndex = [];
                e_labels = [];
                i_labels = [];
                e_chords = [];
                i_chords = [];

                var n = 0;

                // Compute a unique index for each package name
                var totalPositive = 0;
                postives.forEach(function(d) {
                    totalPositive += Number(d.score);
                    d = d.sid;
                    if (!(d in e_indexByName)) {
                        e_nameByIndex[n] = d;
                        e_indexByName[d] = n++;
                    }

                    var l = {};
                    l.index = i;
                    l.label = "null";
                    l.angle = 0;
                    e_labels.push(l);

                    var c = {};
                    c.label = "null";
                    c.source = {};
                    c.target = {};
                    e_chords.push(c);
                });

                postives.forEach(function(d) {
                    var source = e_indexByName[d.sid],
                        row = positive_matrix[source];
                    if (!row) {
                        row = positive_matrix[source] = [];
                        for (var i = -1; ++i < n;) row[i] = 0;
                    }
                    row[e_indexByName[d.sid]] = d.score;
                });

                // Compute a unique index for each name.
                n = 0;
                var totalNegative = 0;
                negatives.forEach(function(d) {
                    totalNegative += Number(d.score);
                    d = d.sid;
                    if (!(d in i_indexByName)) {
                        i_nameByIndex[n] = d;
                        i_indexByName[d] = n++;
                    }

                    var l1 = {};
                    l1.index = i;
                    l1.label = "null";
                    l1.angle = 0;
                    i_labels.push(l1);

                    var c1 = {};
                    c1.label = "null";
                    c1.source = {};
                    c1.target = {};
                    i_chords.push(c1);
                });

                negatives.forEach(function(d) {
                    var source = i_indexByName[d.sid],
                        row = negative_matrix[source];
                    if (!row) {
                        row = negative_matrix[source] = [];
                        for (var i = -1; ++i < n;) row[i] = 0;
                    }
                    row[i_indexByName[d.sid]] = d.score;
                });

                // var positiveRange = angleRange * (totalPositive / (totalPositive - totalNegative));
                // var negativeRange = angleRange - positiveRange;

                var positiveRange = 160;
                var negativeRange = 160;

                export_chord.startAngle(-(positiveRange / 2)).endAngle((positiveRange / 2));
                import_chord.startAngle(180 - (negativeRange / 2)).endAngle(180 + (negativeRange / 2));

                import_chord.matrix(negative_matrix);
                export_chord.matrix(positive_matrix);

                for (var i = 0; i < e_labels.length; i++) {
                    e_labels[i].label = 'null';
                    e_chords[i].label = 'null';
                }

                for (i = 0; i < export_chord.groups().length; i++) {
                    var d = {};
                    var g = export_chord.groups()[i];
                    var c = export_chord.chords()[i];
                    d.index = i;
                    d.angle = (g.startAngle + g.endAngle) / 2;
                    d.label = e_nameByIndex[g.index];
                    d.exports = c.source.value;

                    e_labels.push({
                        angle: d.angle,
                        label: d.label,
                        index: i,
                        exports: d.exports
                    });

                    e_chords.push({
                        index: i,
                        label: d.label,
                        source: c.source,
                        target: c.target,
                        exports: d.exports
                    });
                }

                for (i = 0; i < i_labels.length; i++) {
                    i_labels[i].label = 'null';
                    i_chords[i].label = 'null';
                }

                for (i = 0; i < import_chord.groups().length; i++) {
                    d = {};
                    g = import_chord.groups()[i];
                    c = import_chord.chords()[i];
                    d.index = i;
                    d.angle = (g.startAngle + g.endAngle) / 2;
                    d.label = i_nameByIndex[g.index];
                    d.imports = c.source.value;

                    i_labels.push({
                        angle: d.angle,
                        label: d.label,
                        index: i,
                        imports: d.imports
                    });

                    i_chords.push({
                        index: i,
                        label: d.label,
                        source: c.source,
                        target: c.target,
                        imports: d.imports
                    });
                }

                function getFirstIndex(index, indexes) {
                    for (var i = 0; i < topCountryCount; i++) {
                        var found = false;
                        for (var y = index; y < indexes.length; y++) {
                            if (i == indexes[y]) {
                                found = true;
                            }
                        }
                        if (found == false) {
                            return i;
                        }
                    }
                }

                function getLabelIndex(name) {
                    for (var i = 0; i < topCountryCount; i++) {
                        if (e_buffer[i].label == name) {
                            return i;
                        }
                    }
                    return -1;
                }
            }

            var accumSliderSeries = [];
            var sliderPointer = 0;
            var sliderStrokeDistance = 6; // distance between 2 strokes
            var widthStroke = 2;
            var widthStrokeActive = 2.5;
            var currentApiData = null;

            function buildSliderSeries(apiData) { // data from API
                if (!apiData) {
                    return;
                }

                var countSliderPoints = function(dataFromApi) {
                    return dataFromApi.length - 1; // first item is for naming
                };

                var buildPoint = function(index) {
                    return {
                        index: index,
                        xAxisLabel: '',
                        peakLabel: ''
                    };
                };

                accumSliderSeries = [];
                for (var i = 0; i < countSliderPoints(apiData); i++) {
                    accumSliderSeries.push(buildPoint(i))
                }

                if ((accumSliderSeries.length - 1) * sliderStrokeDistance > maxWidth) {
                    sliderStrokeDistance = 3;
                    widthStroke = 1;
                    widthStrokeActive = 1.5;
                }
                if ((accumSliderSeries.length - 1) > 200) {
                    sliderStrokeDistance = 2;
                    widthStroke = 0.75;
                    widthStrokeActive = 1;
                }
                var sliderWidth = sliderStrokeDistance * accumSliderSeries.length;
                mGroup.attr("transform", "translate(" + (outerRadius - sliderWidth / 2) + "," + 20 + ")");
                sliderPointer = 0;
            }

            function parseDataAndUpdate(data) {
                currentApiData = data;
                var transformed = parseData(data, sliderPointer);
                if (transformed === null) {
                    return false;
                } else {
                    // console.debug(sliderPointer);
                    update(transformed);
                    return true;
                }
            }

            function update(data) {
                updateSliders(sliderPointer++);

                buildChords(data);

                eText = eGroup.selectAll("g.group")
                    .data(e_labels, function(d) {
                        return d.label;
                    });

                iText = iGroup.selectAll("g.group")
                    .data(i_labels, function(d) {
                        return d.label;
                    });

                eChords = eGroup.selectAll("g.chord")
                    .data(e_chords, function(d) {
                        return d.label;
                    });

                iChords = iGroup.selectAll("g.chord")
                    .data(i_chords, function(d) {
                        return d.label;
                    });

                eText.enter()
                    .append("g")
                    .attr("class", "group")
                    .append("text")
                    .attr("class", "export")
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) {
                        return d.angle > Math.PI ? "end" : null;
                    })
                    .attr("transform", function(d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                            "translate(" + (innerRadius + 6) + ")" +
                            (d.angle > Math.PI ? "rotate(180)" : "");
                    })
                    .text(function(d) {
                        if (d.index === undefined) {
                            return;
                        }
                        return (d.index + 1) + ". " + d.label;
                    })
                    .on("mouseover", function(d) {
                        node_onMouseOver(d);
                    })
                    .on("mouseout", function(d) {
                        node_onMouseOut(d);
                    });

                eText.transition()
                    .duration(delay - 1000)
                    .select("text")
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) {
                        return d.angle > Math.PI ? "end" : null;
                    })
                    .attr("transform", function(d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                            "translate(" + (innerRadius + 6) + ")" +
                            (d.angle > Math.PI ? "rotate(180)" : "");
                    })
                    .text(function(d) {
                        if (d.index === undefined) {
                            return;
                        }
                        return (d.index + 1) + ". " + d.label;
                    });

                eText.exit().remove();

                eChords.enter()
                    .append("g")
                    .attr("class", "chord")
                    .append("path")
                    .attr("class", "chord")
                    .style("stroke", function(d) {
                        return d3.rgb(getExportColor(d.source.index)).darker();
                    })
                    .style("fill", function(d) {
                        return getExportColor(d.source.index);
                    })
                    .style("fill-opacity", function(d, i) {
                        return .85 * (data.positive.length - d.index) / data.positive.length
                    })
                    .attr("d", d3.svg.arc_chord().radius(innerRadius))
                    .style("opacity", 0)
                    .on("mouseover", function(d) {
                        node_onMouseOver(d);
                    })
                    .on("mouseout", function(d) {
                        node_onMouseOut(d);
                    });


                eChords.transition()
                    .select("path")
                    .duration(delay- 1000)
                    .attr("d", d3.svg.arc_chord().radius(innerRadius))
                    .style("stroke", function(d) {
                        return d3.rgb(getExportColor(d.source.index)).darker();
                    })
                    .style("fill", function(d) {
                        return getExportColor(d.source.index);
                    })
                    .style("stroke-opacity", function(d, i) {
                        return Math.max(.85 * (data.positive.length - d.index) / data.positive.length, .2);
                    })
                    .style("fill-opacity", function(d, i) {
                        return .85 * (data.positive.length - d.index) / data.positive.length
                    })
                    .style("opacity", 1);


                eChords.exit()
                    .remove();

                iText.enter()
                    .append("g")
                    .attr("class", "group")
                    .append("text")
                    .attr("class", "import")
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) {
                        return d.angle > Math.PI ? "end" : null;
                    })
                    .attr("transform", function(d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                            "translate(" + (innerRadius + 6) + ")" +
                            (d.angle > Math.PI ? "rotate(180)" : "");
                    })
                    .text(function(d) {
                        if (d.index === undefined) {
                            return;
                        }
                        return (d.index + 1) + ". " + d.label;
                    })
                    .on("mouseover", function(d) {
                        node_onMouseOver(d);
                    })
                    .on("mouseout", function(d) {
                        node_onMouseOut(d);
                    });

                iText.transition()
                    .select("text")
                    .duration(delay - 1000)
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) {
                        return d.angle > Math.PI ? "end" : null;
                    })
                    .attr("transform", function(d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                            "translate(" + (innerRadius + 6) + ")" +
                            (d.angle > Math.PI ? "rotate(180)" : "");
                    })
                    .text(function(d) {
                        if (d.index === undefined) {
                            return;
                        }
                        return (d.index + 1) + ". " + d.label;
                    });

                iText.exit()
                    .attr("class", "exit")
                    .transition()
                    .duration(delay)
                    .attr("y", 0)
                    .attr("fill-opacity", 1e-6)
                    .remove();

                iChords.enter()
                    .append("g")
                    .attr("class", "chord")
                    .append("path")
                    .attr("class", "chord")
                    .style("stroke", function(d) {
                        return d3.rgb(getImportColor(d.source.index)).darker();
                    })
                    .style("stroke-opacity", function(d, i) {
                        return Math.max(.85 * (data.negative.length - d.index) / data.negative.length, .2);
                    })
                    .style("fill", function(d) {
                        return getImportColor(d.source.index);
                    })
                    .style("fill-opacity", function(d, i) {
                        return .7 * (data.negative.length - d.index) / data.negative.length
                    })
                    .attr("d", d3.svg.arc_chord().radius(innerRadius))
                    .on("mouseover", function(d) {
                        node_onMouseOver(d);
                    })
                    .on("mouseout", function(d) {
                        node_onMouseOut(d);
                    });

                iChords.transition()
                    .select("path")
                    .duration(delay - 1000)
                    .attr("d", d3.svg.arc_chord().radius(innerRadius))
                    .style("stroke", function(d) {
                        return d3.rgb(getImportColor(d.source.index)).darker();
                    })
                    .style("fill", function(d) {
                        return getImportColor(d.source.index);
                    })
                    .style("stroke-opacity", function(d, i) {
                        return Math.max(.85 * (data.negative.length - d.index) / data.negative.length, .2);
                    })
                    .style("fill-opacity", function(d, i) {
                        return .7 * (data.negative.length - d.index) / data.negative.length
                    });


                iChords.exit()
                    .remove();

            }

            function updateCompany(company_info) {
                var imageInfo = coGroup
                    .selectAll("image")
                    .data([company_info]);
                imageInfo
                    .enter()
                    .append("image")
                    .attr("class", "companyIcon")
                    .attr("transform", "translate(" + (outerRadius - 40) + "," + (outerRadius * 1.02) + ")")
                    .attr('width', 80)
                    .attr('height', 80)
                    .attr("xlink:href", function(d) {
                        return d.icon;
                    });
                imageInfo.exit().remove();

                var textInfo = coGroup
                    .selectAll("text")
                    .data([company_info]);
                textInfo
                    .enter()
                    .append("text")
                    .text(function(d) {
                        return d.name;
                    })
                    .attr("class", "companyName")
                    .attr("fill", "#52687a")
                    .style("font-size", "18px")
                    .attr("transform", function(e) {
                        return "translate(" + (outerRadius - (this.clientWidth != 0 ? this.clientWidth : (this.childNodes[0].length * 8.5)) / 2) + "," + (outerRadius * 1.25) + ")"
                    });
                textInfo.exit().remove();
            }

            function updateSliders(currentIndex) {
                function getStrokeY1(ordinalFromCurrent) {
                    if (ordinalFromCurrent == 0)
                        return 0;
                    else if (ordinalFromCurrent == 1)
                        return 4;
                    else if (ordinalFromCurrent == 2)
                        return 8;
                    else if (ordinalFromCurrent == 3)
                        return 11;
                    else if (ordinalFromCurrent == 4)
                        return 14;
                    else if (ordinalFromCurrent == 5)
                        return 15;
                    else if (ordinalFromCurrent == 6)
                        return 15;
                    else
                        return 16;
                }

                function getOpacityFromCurrent(ordinalFromCurrent) {
                    if (ordinalFromCurrent == 0)
                        return 1;
                    else if (ordinalFromCurrent == 1)
                        return .9;
                    else if (ordinalFromCurrent == 2)
                        return .8;
                    else if (ordinalFromCurrent == 3)
                        return .7;
                    else if (ordinalFromCurrent == 4)
                        return .6;
                    else if (ordinalFromCurrent == 5)
                        return .5;
                    else if (ordinalFromCurrent == 6)
                        return .4;
                    else
                        return .4;
                }

                var maxHeight = 22;

                var monthAxis = mGroup.selectAll("g.month")
                    .data(accumSliderSeries);

                monthEnter = monthAxis.enter()
                    .append("g")
                    .attr("class", "month");

                monthEnter.append("line")
                    .attr("x1", function(dataAtI, i) {
                        return i * sliderStrokeDistance;
                    })
                    .attr("x2", function(dataAtI, i) {
                        return i * sliderStrokeDistance;
                    })
                    .attr("y1", function(dataAtI, i) {
                        var ordinalFromCurrent = Math.abs(currentIndex - i);
                        return getStrokeY1(ordinalFromCurrent);
                    })
                    .attr("y2", maxHeight)
                    .attr("shape-rendering", "crispEdges")
                    .attr('stroke-width', widthStroke)
                    .style("stroke-opacity", function(d, i) {
                        var ordinalFromCurrent = Math.abs(currentIndex - i);
                        return getOpacityFromCurrent(ordinalFromCurrent);
                    })
                    .style("stroke", "#000")
                    .on("click", function(d) {
                        sliderPointer = d.index;
                        parseDataAndUpdate(currentApiData);
                    });

                // top text
                monthEnter.append("text")
                    .attr("transform", function(dataAtI, i) {
                        return "translate (" + String(i * sliderStrokeDistance - 10) + ", -3)";
                    })
                    .text(function(dataAtI, i) {
                        return dataAtI.peakLabel;
                    })
                    .style("fill-opacity", function(d, i) {
                        return 0; // hide by default, will be delay-shown latter
                    });

                // bottom text
                monthEnter.append("text")
                    .attr("transform", function(dataAtI, i) {
                        return "translate (" + (i * sliderStrokeDistance - 10) + ",33)";
                    })
                    .text(function(dataAtI, i) {
                        return dataAtI.xAxisLabel + '';
                    });

                monthUpdate = monthAxis.transition();

                // show/hide text
                monthUpdate.select("text")
                    .delay(delay / 2)
                    .style("fill-opacity", function(d) {
                        if (d.index == currentIndex) {
                            return 1;
                        }
                        return 0;
                    });

                monthUpdate.select("line")
                    .delay(delay / 2)
                    .attr("y1", function(d, i) {
                        var ordinalFromCurrent = Math.abs(currentIndex - i);
                        return getStrokeY1(ordinalFromCurrent);
                    })
                    .style("stroke-width", function(d, i) {
                        if (i == currentIndex) {
                            return widthStrokeActive;
                        }
                        return widthStroke;
                    })
                    .style("stroke-opacity", function(d, i) {
                        var ordinalFromCurrent = Math.abs(currentIndex - i);
                        return getOpacityFromCurrent(ordinalFromCurrent);
                    })
                    .style("stroke", "#000");
            }

            function getExportColor(i) {
                var country = e_nameByIndex[i];
                if (e_colorByName[country] == undefined) {
                    e_colorByName[country] = e_fill(i);
                }

                return e_colorByName[country];
            }

            function getImportColor(i) {
                var country = i_nameByIndex[i];
                if (i_colorByName[country] == undefined) {
                    i_colorByName[country] = i_fill(i);
                }

                return i_colorByName[country];
            }
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#3F51B5',
          'success':                '#4CAF50',
          'info':                   '#2196F3',
          'warning':                '#FF9800',
          'danger':                 '#F44336',
          'inverse':                '#607D8B',
          'green':                  '#009688',
          'pink':                   '#E91E63',
          'purple':                 '#673AB7',
          'dark':                   '#263238',
          'yellow':                 '#FFEB3B',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

      // Improve performance disabling debugging features
      // $compileProvider.debugInfoEnabled(false);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors', 'authService'];

    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors, authService) {

      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // -----------------------------------

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
          // Default load login page
          if (['auth.login', 'auth.register', 'auth.forgotPassword', 'auth.resetPassword'].indexOf(toState.name) === -1) {
            if (authService.isLoggedIn() === false) {
              $state.go('auth.login');
              return;
            }
          }
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };

    }

})();

(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
            'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                                   'vendor/simple-line-icons/css/simple-line-icons.css'],
            'weather-icons':      ['vendor/weather-icons/css/weather-icons.min.css',
                                   'vendor/weather-icons/css/weather-icons-wind.min.css'],
            'loadGoogleMapsJS':   ['vendor/load-google-maps/load-google-maps.js'],
            'stocks':             ['vendor/socket.io-client/dist/socket.io.js',
                                   'vendor/moment/moment.js'],
            'screenfull':         ['vendor/screenfull/dist/screenfull.js'],
            'charts':             ['vendor/d3/d3.js',
                                    'libs/vizuly-halo/vizuly_core.min.js',
                                    'libs/vizuly-halo/vizuly_halo.min.js',
                                    'libs/vizuly-halo/theme_showreel.js',
                                    'libs/orb-chart/trigonometry.js',
                                    'libs/orb-chart/arc.js',
                                    'libs/orb-chart/source.js',
                                    'libs/orb-chart/target.js',
                                    'libs/orb-chart/arc-chord_002.js',
                                    'libs/orb-chart/arc-chord.js',
                                    'libs/orb-chart/gradients.js'],
            'flot-chart':         ['vendor/Flot/jquery.flot.js'],
            'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                                   'vendor/Flot/jquery.flot.resize.js',
                                   'vendor/Flot/jquery.flot.pie.js',
                                   'vendor/Flot/jquery.flot.time.js',
                                   'vendor/Flot/jquery.flot.categories.js',
                                   'vendor/flot-spline/js/jquery.flot.spline.min.js'],
           'loaders.css':          ['vendor/loaders.css/loaders.css'],
           'spinkit':              ['vendor/spinkit/css/spinkit.css']
          },
          // Angular based script (use the right module name)
          modules: [
            // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
            {name: 'ui.map',                    files: ['vendor/angular-ui-map/ui-map.js']}
          ]
        })
        ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('ModalGmapController', ModalGmapController);

    ModalGmapController.$inject = ['$uibModal'];
    function ModalGmapController($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.open = function (size) {

            //var modalInstance =
            $uibModal.open({
              templateUrl: '/myModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };

          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout'];
          function ModalInstanceCtrl($scope, $uibModalInstance, $timeout) {

            $uibModalInstance.opened.then(function () {
              var position = new google.maps.LatLng(33.790807, -117.835734);

              $scope.mapOptionsModal = {
                zoom: 14,
                center: position,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };

              // we use timeout to wait maps to be ready before add a markers
              $timeout(function(){
                // 1. Add a marker at the position it was initialized
                new google.maps.Marker({
                  map: $scope.myMapModal,
                  position: position
                });
                // 2. Trigger a resize so the map is redrawed
                google.maps.event.trigger($scope.myMapModal, 'resize');
                // 3. Move to the center if it is misaligned
                $scope.myMapModal.panTo(position);
              });

            });

            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };

          }

        }
    }

})();


(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('GMapController', GMapController);

    GMapController.$inject = ['$timeout'];
    function GMapController($timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          var position = [
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.787453, -117.835858)
            ];
          
          vm.addMarker = addMarker;
          // we use timeout to wait maps to be ready before add a markers
          $timeout(function(){
            addMarker(vm.myMap1, position[0]);
            addMarker(vm.myMap2, position[1]);
            addMarker(vm.myMap3, position[2]);
            addMarker(vm.myMap5, position[3]);
          });

          vm.mapOptions1 = {
            zoom: 14,
            center: position[0],
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          vm.mapOptions2 = {
            zoom: 19,
            center: position[1],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          vm.mapOptions3 = {
            zoom: 14,
            center: position[2],
            mapTypeId: google.maps.MapTypeId.SATELLITE
          };

          vm.mapOptions4 = {
            zoom: 14,
            center: position[3],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          // for multiple markers
          $timeout(function(){
            addMarker(vm.myMap4, position[3]);
            addMarker(vm.myMap4, position[4]);
          });

          // custom map style
          var MapStyles = [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#bdd1f9'}]},{'featureType':'all','elementType':'labels.text.fill','stylers':[{'color':'#334165'}]},{featureType:'landscape',stylers:[{color:'#e9ebf1'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#c5c6c6'}]},{featureType:'road.arterial',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'road.local',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#d8dbe0'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#cfd5e0'}]},{featureType:'administrative',stylers:[{visibility:'on'},{lightness:33}]},{featureType:'poi.park',elementType:'labels',stylers:[{visibility:'on'},{lightness:20}]},{featureType:'road',stylers:[{color:'#d8dbe0',lightness:20}]}];
          vm.mapOptions5 = {
            zoom: 14,
            center: position[3],
            styles: MapStyles,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          ///////////////
          
          function addMarker(map, position) {
            return new google.maps.Marker({
              map: map,
              position: position
            });
          }

        }
    }
})();


(function() {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .config(materialConfig)
        ;
    materialConfig.$inject = ['$mdIconProvider'];
    function materialConfig($mdIconProvider){
      $mdIconProvider
        .icon('share-arrow', 'app/img/icons/share-arrow.svg', 24)
        .icon('upload', 'app/img/icons/upload.svg', 24)
        .icon('copy', 'app/img/icons/copy.svg', 24)
        .icon('print', 'app/img/icons/print.svg', 24)
        .icon('hangout', 'app/img/icons/hangout.svg', 24)
        .icon('mail', 'app/img/icons/mail.svg', 24)
        .icon('message', 'app/img/icons/message.svg', 24)
        .icon('copy2', 'app/img/icons/copy2.svg', 24)
        .icon('facebook', 'app/img/icons/facebook.svg', 24)
        .icon('twitter', 'app/img/icons/twitter.svg', 24);
    }
})();


(function() {
    'use strict';

    angular
        .module('app.material')
        .controller('MDAutocompleteCtrl', MDAutocompleteCtrl)
        .controller('MDBottomSheetCtrl', MDBottomSheetCtrl)
        .controller('MDListBottomSheetCtrl', MDListBottomSheetCtrl)
        .controller('MDGridBottomSheetCtrl', MDGridBottomSheetCtrl)
        .controller('MDCheckboxCtrl', MDCheckboxCtrl)
        .controller('MDRadioCtrl', MDRadioCtrl)
        .controller('MDSwitchCtrl', MDSwitchCtrl)
        .controller('MDDialogCtrl', MDDialogCtrl)
        .controller('MDSliderCtrl', MDSliderCtrl)
        .controller('MDSelectCtrl', MDSelectCtrl)
        .controller('MDInputCtrl', MDInputCtrl)
        .controller('MDProgressCtrl', MDProgressCtrl)
        .controller('MDSidenavCtrl', MDSidenavCtrl)
        .controller('MDSubheaderCtrl', MDSubheaderCtrl)
        .controller('MDToastCtrl', MDToastCtrl)
          .controller('ToastCtrl', ToastCtrl)
        .controller('MDTooltipCtrl', MDTooltipCtrl)
        .controller('BottomSheetExample', BottomSheetExample)
          .controller('ListBottomSheetCtrl', ListBottomSheetCtrl)
          .controller('GridBottomSheetCtrl', GridBottomSheetCtrl)
        ;

    /*
      MDAutocompleteCtrl
     */
    MDAutocompleteCtrl.$inject = ['$scope', '$timeout', '$q'];
    function MDAutocompleteCtrl($scope, $timeout, $q) {
      var self = this;

      self.states        = loadAll();
      self.selectedItem  = null;
      self.searchText    = null;
      self.querySearch   = querySearch;
      self.simulateQuery = false;
      self.isDisabled    = false;

      // use $timeout to simulate remote dataservice call
      function querySearch (query) {
        var results = query ? self.states.filter( createFilterFor(query) ) : [],
            deferred;
        if (self.simulateQuery) {
          deferred = $q.defer();
          $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          return deferred.promise;
        } else {
          return results;
        }
      }

      function loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming';

        return allStates.split(/, +/g).map( function (state) {
          return {
            value: state.toLowerCase(),
            display: state
          };
        });
      }

          /**
           * Create filter function for a query string
           */
          function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
              return (state.value.indexOf(lowercaseQuery) === 0);
            };

          }
        }

    /*
    MDBottomSheetCtrl
     */
    MDBottomSheetCtrl.$inject = ['$scope', '$timeout', '$mdBottomSheet'];
    function MDBottomSheetCtrl($scope, $timeout, $mdBottomSheet) {
      $scope.alert = '';

      $scope.showListBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-list-template.html',
          controller: 'ListBottomSheetCtrl',
          targetEvent: $event
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };

      $scope.showGridBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-grid-template.html',
          controller: 'GridBottomSheetCtrl',
          targetEvent: $event
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };
    }
    /*
    MDListBottomSheetCtrl
     */
    MDListBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function MDListBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Share', icon: 'share' },
        { name: 'Upload', icon: 'upload' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Print this page', icon: 'print' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    MDGridBottomSheetCtrl
     */
    MDGridBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function MDGridBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Hangout', icon: 'hangout' },
        { name: 'Mail', icon: 'mail' },
        { name: 'Message', icon: 'message' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Facebook', icon: 'facebook' },
        { name: 'Twitter', icon: 'twitter' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    MDCheckboxCtrl
     */
    MDCheckboxCtrl.$inject = ['$scope'];
    function MDCheckboxCtrl($scope) {

      $scope.data = {};
      $scope.data.cb1 = true;
      $scope.data.cb2 = false;
      $scope.data.cb3 = false;
      $scope.data.cb4 = false;
      $scope.data.cb5 = false;
    }
    /*
    MDRadioCtrl
     */
    MDRadioCtrl.$inject = ['$scope'];
    function MDRadioCtrl($scope) {

        $scope.data = {
          group1 : 'Banana',
          group2 : '2',
          group3 : 'avatar-1'
        };

        $scope.avatarData = [{
            id: 'svg-1',
            title: 'avatar 1',
            value: 'avatar-1'
          },{
            id: 'svg-2',
            title: 'avatar 2',
            value: 'avatar-2'
          },{
            id: 'svg-3',
            title: 'avatar 3',
            value: 'avatar-3'
        }];

        $scope.radioData = [
          { label: 'Apple', value: 1 },
          { label: 'Banana', value: 2 },
          { label: 'Mango', value: '3', isDisabled: true }
        ];


        $scope.submit = function() {
          alert('submit');
        };

        var vals = ['Apple', 'Banana', 'Mango', 'Grape', 'Melon', 'Strawberry', 'Kiwi'];
        $scope.addItem = function() {
          var rval = vals[Math.floor(Math.random() * vals.length)];
          $scope.radioData.push({ label: rval, value: rval });
        };

        $scope.removeItem = function() {
          $scope.radioData.pop();
        };
    }
    /*
    MDSwitchCtrl
     */
    MDSwitchCtrl.$inject = ['$scope'];
    function MDSwitchCtrl($scope) {
      $scope.data = {
        cb1: true,
        cb4: true
      };
      
      $scope.onChange = function(cbState){
         $scope.message = 'The switch is now: ' + cbState;
      };
    }
    /*
    MDDialogCtrl
     */
    MDDialogCtrl.$inject = ['$scope', '$mdDialog'];
    function MDDialogCtrl($scope, $mdDialog) {
      $scope.alert = '';

      $scope.showAlert = function(ev) {
        $mdDialog.show(
          $mdDialog.alert()
            .title('This is an alert title')
            .content('You can specify some description text in here.')
            .ariaLabel('Password notification')
            .ok('Got it!')
            .targetEvent(ev)
        );
      };

      $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .content('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .ok('Please do it!')
          .cancel('Sounds like a scam')
          .targetEvent(ev);

        $mdDialog.show(confirm).then(function() {
          $scope.alert = 'You decided to get rid of your debt.';
        }, function() {
          $scope.alert = 'You decided to keep your debt.';
        });
      };

      $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'dialog1.tmpl.html',
          targetEvent: ev,
        })
        .then(function(answer) {
          $scope.alert = 'You said the information was \'' + answer + '\'.';
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
      };
      DialogController.$inject = ['$scope', '$mdDialog'];
      function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
    }
    /*
    MDSliderCtrl
     */
    MDSliderCtrl.$inject = ['$scope'];
    function MDSliderCtrl($scope) {

      $scope.color = {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
      };

      $scope.rating1 = 3;
      $scope.rating2 = 2;
      $scope.rating3 = 4;

      $scope.disabled1 = 0;
      $scope.disabled2 = 70;
    }
    /*
    MDSelectCtrl
     */
    function MDSelectCtrl() {
      
      var vm = this;
      
      vm.userState = '';
      vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
          'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
          'WY').split(' ').map(function (state) { return { abbrev: state }; });

      vm.sizes = [
          'small (12-inch)',
          'medium (14-inch)',
          'large (16-inch)',
          'insane (42-inch)'
      ];
      vm.toppings = [
        { category: 'meat', name: 'Pepperoni' },
        { category: 'meat', name: 'Sausage' },
        { category: 'meat', name: 'Ground Beef' },
        { category: 'meat', name: 'Bacon' },
        { category: 'veg', name: 'Mushrooms' },
        { category: 'veg', name: 'Onion' },
        { category: 'veg', name: 'Green Pepper' },
        { category: 'veg', name: 'Green Olives' }
      ];
    }
    /*
    MDInputCtrl
     */
    MDInputCtrl.$inject = ['$scope'];
    function MDInputCtrl($scope) {
      $scope.user = {
        title: 'Developer',
        email: 'ipsum@lorem.com',
        firstName: '',
        lastName: '' ,
        company: 'Google' ,
        address: '1600 Amphitheatre Pkwy' ,
        city: 'Mountain View' ,
        state: 'CA' ,
        biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
        postalCode : '94043'
      };
      $scope.project = {
        description: 'Nuclear Missile Defense System',
        clientName: 'Bill Clinton',
        rate: 500
      };
    }
    /*
    MDProgressCtrl
     */
    MDProgressCtrl.$inject = ['$scope', '$interval'];
    function MDProgressCtrl($scope, $interval) {
        $scope.mode = 'query';
        $scope.determinateValue = 30;
        $scope.determinateValue2 = 30;

        $interval(function() {
          $scope.determinateValue += 1;
          $scope.determinateValue2 += 1.5;
          if ($scope.determinateValue > 100) {
            $scope.determinateValue = 30;
            $scope.determinateValue2 = 30;
          }
        }, 100, 0, true);

        $interval(function() {
          $scope.mode = ($scope.mode === 'query' ? 'determinate' : 'query');
        }, 7200, 0, true);
    }
    /*
    MDSidenavCtrl
     */
    MDSidenavCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];
    function MDSidenavCtrl($scope, $timeout, $mdSidenav, $log) {
      $scope.toggleLeft = function() {
        $mdSidenav('left').toggle()
                          .then(function(){
                              $log.debug('toggle left is done');
                          });
      };
      $scope.toggleRight = function() {
        $mdSidenav('right').toggle()
                            .then(function(){
                              $log.debug('toggle RIGHT is done');
                            });
      };
      $scope.closeLeft = function() {
        $mdSidenav('left').close()
                          .then(function(){
                            $log.debug('close LEFT is done');
                          });

      };
      $scope.closeRight = function() {
        $mdSidenav('right').close()
                            .then(function(){
                              $log.debug('close RIGHT is done');
                            });
      };
    }
    /*
    MDSubheaderCtrl
     */
    MDSubheaderCtrl.$inject = ['$scope'];
    function MDSubheaderCtrl($scope) {
        $scope.messages = [
          {
            face : 'app/img/user/10.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/01.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/02.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/03.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/04.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/05.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/06.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/07.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/08.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/09.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/11.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
        ];
    }
    /*
    MDToastCtrl
     */
    MDToastCtrl.$inject = ['$scope', '$mdToast'];
    function MDToastCtrl($scope, $mdToast) {

      $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };

      $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
      };

      $scope.showCustomToast = function() {
        $mdToast.show({
          controller: 'ToastCtrl',
          templateUrl: 'toast-template.html',
          hideDelay: 60000,
          parent:'#toastcontainer',
          position: $scope.getToastPosition()
        });
      };

      $scope.showSimpleToast = function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Simple Toast!')
            .position($scope.getToastPosition())
            .hideDelay(30000)
        );
      };

      $scope.showActionToast = function() {
        var toast = $mdToast.simple()
              .content('Action Toast!')
              .action('OK')
              .highlightAction(false)
              .position($scope.getToastPosition());

        $mdToast.show(toast).then(function() {
          alert('You clicked \'OK\'.');
        });
      };
    }
    /*
    ToastCtrl
     */
    ToastCtrl.$inject = ['$scope', '$mdToast'];
    function ToastCtrl($scope, $mdToast) {
      $scope.closeToast = function() {
        $mdToast.hide();
      };
    }
    /*
    MDTooltipCtrl
     */
    MDTooltipCtrl.$inject = ['$scope'];
    function MDTooltipCtrl($scope) {
      $scope.demo = {};
    }
    /*
    BottomSheetExample
     */
    BottomSheetExample.$inject = ['$scope', '$timeout', '$mdBottomSheet'];
    function BottomSheetExample($scope, $timeout, $mdBottomSheet) {
      $scope.alert = '';

      $scope.showListBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-list-template.html',
          controller: 'ListBottomSheetCtrl',
          targetEvent: $event,
          parent: '#bottomsheetcontainer'
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };

      $scope.showGridBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-grid-template.html',
          controller: 'GridBottomSheetCtrl',
          targetEvent: $event,
          parent: '#bottomsheetcontainer'
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };
    }
    /*
    ListBottomSheetCtrl
     */
    ListBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function ListBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Share', icon: 'share-arrow' },
        { name: 'Upload', icon: 'upload' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Print this page', icon: 'print' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    GridBottomSheetCtrl
     */
    GridBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function GridBottomSheetCtrl($scope, $mdBottomSheet) {
      $scope.items = [
        { name: 'Hangout', icon: 'hangout' },
        { name: 'Mail', icon: 'mail' },
        { name: 'Message', icon: 'message' },
        { name: 'Copy', icon: 'copy2' },
        { name: 'Facebook', icon: 'facebook' },
        { name: 'Twitter', icon: 'twitter' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }


})();

(function() {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .run(materialRun)
        ;
    materialRun.$inject = ['$http', '$templateCache'];
    function materialRun($http, $templateCache){
      var urls = [
        'app/img/icons/share-arrow.svg',
        'app/img/icons/upload.svg',
        'app/img/icons/copy.svg',
        'app/img/icons/print.svg',
        'app/img/icons/hangout.svg',
        'app/img/icons/mail.svg',
        'app/img/icons/message.svg',
        'app/img/icons/copy2.svg',
        'app/img/icons/facebook.svg',
        'app/img/icons/twitter.svg'
      ];

      angular.forEach(urls, function(url) {
        $http.get(url, {cache: $templateCache});
      });

    }

})();

(function() {
    'use strict';

    angular
        .module('app.material')
        .controller('MaterialWidgetsController', MaterialWidgetsController);

    MaterialWidgetsController.$inject = ['Colors'];
    function MaterialWidgetsController(Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.sparkOption1 = {
            type : 'line',
            width : '100%',
            height : '140px',
            tooltipOffsetX : -20,
            tooltipOffsetY : 20,
            lineColor : Colors.byName('success'),
            fillColor : Colors.byName('success'),
            spotColor : 'rgba(0,0,0,.26)',
            minSpotColor : 'rgba(0,0,0,.26)',
            maxSpotColor : 'rgba(0,0,0,.26)',
            highlightSpotColor : 'rgba(0,0,0,.26)',
            highlightLineColor : 'rgba(0,0,0,.26)',
            spotRadius : 2,
            tooltipPrefix : '',
            tooltipSuffix : ' Visits',
            tooltipFormat : '{{prefix}}{{y}}{{suffix}}',
            chartRangeMin: 0,
            resize: true
          };

          vm.sparkOptionPie = {
            type: 'pie',
            width : '2em',
            height : '2em',
            sliceColors: [ Colors.byName('success'), Colors.byName('gray-light')]
          };
        
        }
    }
})();
/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');

          var isOpen = navbarForm.hasClass('open');

          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            // .val('') // Empty input
            ;
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 10);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 1500);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
          .state('app', {
              url: '',
              abstract: true,
              templateUrl: helper.basepath('app.html'),
              resolve: helper.resolveFor('modernizr', 'icons', 'screenfull')
          })
          .state('app.home', {
              url: '/',
              title: 'Home',
              templateUrl: 'app/pages/home.html',
              resolve: helper.resolveFor('stocks', 'loaders.css', 'spinkit'),
              onEnter: ["$rootScope", function($rootScope){
                $rootScope.app.layout.headerHome = true;
              }],
              onExit: ["$rootScope", function($rootScope){
                $rootScope.app.layout.headerHome = false;
              }]
          })
          .state('app.company', {
              url: '/company/:id',
              title: 'Company',
              templateUrl: 'app/pages/company.html',
              resolve: helper.resolveFor('stocks', 'flot-chart','flot-chart-plugins')
          })
          .state('app.features', {
              url: '/features',
              title: 'Features',
              templateUrl: 'app/pages/features.html'
          })
          .state('app.pricing', {
              url: '/pricing',
              title: 'Pricing',
              templateUrl: 'app/pages/pricing.html'
          })
          .state('app.investors', {
              url: '/investors',
              title: 'Investors',
              templateUrl: 'app/pages/investors.html'
          })
          .state('app.faq', {
              url: '/faq',
              title: 'Faq',
              templateUrl: 'app/pages/faq.html'
          })
          .state('auth', {
              url: '/auth',
              templateUrl: 'app/pages/auth.html',
              resolve: helper.resolveFor('modernizr', 'icons'),
              controller: ['$rootScope', function($rootScope) {
                  $rootScope.app.layout.isBoxed = false;
              }]
          })
          .state('auth.login', {
              url: '/login',
              title: 'Login',
              templateUrl: 'app/pages/login.html'
          })
          .state('auth.register', {
              url: '/register',
              title: 'Register',
              templateUrl: 'app/pages/register.html'
          })
          .state('auth.forgotPassword', {
              url: '/forgot-password',
              title: 'Forgot Password',
              templateUrl: 'app/pages/forgot-password.html'
          })
          .state('auth.resetPassword', {
              url: '/reset-password',
              title: 'Reset Password',
              templateUrl: 'app/pages/reset-password.html'
          })
          .state('auth.changePassword', {
              url: '/change-password',
              title: 'Change Password',
              templateUrl: 'app/pages/change-password.html'
          })



            //
          .state('app.welcome', {
              url: '/welcome',
              title: 'Welcome',
              templateUrl: helper.basepath('welcome.html')
          })
          //
          // Material
          // -----------------------------------
          .state('app.cards', {
            url: '/cards',
            title: 'Material Cards',
            templateUrl: helper.basepath( 'material.cards.html' )
          })
          .state('app.forms', {
            url: '/forms',
            title: 'Material Forms',
            templateUrl: helper.basepath( 'material.forms.html' )
          })
          .state('app.whiteframe', {
            url: '/whiteframe',
            title: 'Material Whiteframe',
            templateUrl: helper.basepath( 'material.whiteframe.html' )
          })
          .state('app.matcolors', {
            url: '/matcolors',
            title: 'Material Colors',
            templateUrl: helper.basepath( 'material.colors.html' )
          })
          .state('app.lists', {
            url: '/lists',
            title: 'Material Lists',
            templateUrl: helper.basepath( 'material.lists.html' )
          })
          .state('app.inputs', {
            url: '/inputs',
            title: 'Material Inputs',
            templateUrl: helper.basepath( 'material.inputs.html' )
          })
          .state('app.matwidgets', {
            url: '/matwidgets',
            title: 'Material Widgets',
            templateUrl: helper.basepath( 'material.widgets.html' ),
            resolve: helper.resolveFor('weather-icons', 'loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
          })
          .state('app.ngmaterial', {
            url: '/ngmaterial',
            title: 'ngMaterial',
            templateUrl: helper.basepath( 'material.ngmaterial.html' )
          })
          //
          // CUSTOM RESOLVES
          //   Add your own resolves properties
          //   following this object extend
          //   method
          // -----------------------------------
          // .state('app.someroute', {
          //   url: '/some_url',
          //   templateUrl: 'path_to_template.html',
          //   controller: 'someController',
          //   resolve: angular.extend(
          //     helper.resolveFor(), {
          //     // YOUR RESOLVES GO HERE
          //     }
          //   )
          // })
          ;

    } // routesConfig

})();

(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('apiService', apiService);

    apiService.$inject = ['$http', '$cookies', '$q', '$window', 'authToken', '$rootScope'];

    function apiService($http, $cookies, $q, $window, authToken, $rootScope) {

        return {
            get: getRequest,
            put: putRequest,
            post: postRequest,
            patch: patchRequest,
            delete: deleteRequest,
            postMultiPart: postMultiPart,
            patchMultiPart: patchMultiPart
        };

        function makeRequest(method, path, data, authRequired) {


            var deferred = $q.defer();

            var request = {
                method: method,
                url: $rootScope.app.apiUrl + path
            };

            if (data) {
                if (method === 'GET') {
                    request.params = data;
                } else {
                    request.data = data;
                }
            }

            if (authRequired) {
                request.headers = {
                    'Authorization': 'Token ' + authToken.get(true)
                };
            }

            $http(request).then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(response) {
                    if (response.status === 403 && request.url.match(/\/auth\/logout\/$/) === null) {
                        destroyCookies();
                    }
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function destroyCookies() {
            $cookies.remove('usertype', {
                path: '/'
            });
            authToken.delete();
        }

        function getRequest(path, data, authRequired) {
            data = (typeof data !== 'object') ? false : data;
            authRequired = (authRequired === true) ? true : false;
            return makeRequest('GET', path, data, authRequired);
        }

        function putRequest(path, data, authRequired) {
            data = (typeof data !== 'object') ? false : data;
            authRequired = (authRequired === true) ? true : false;
            return makeRequest('PUT', path, data, authRequired);
        }

        function postRequest(path, data, authRequired) {
            data = (typeof data !== 'object') ? false : data;
            authRequired = (authRequired === true) ? true : false;
            return makeRequest('POST', path, data, authRequired);
        }

        function patchRequest(path, data, authRequired) {
            data = (typeof data !== 'object') ? false : data;
            authRequired = (authRequired === true) ? true : false;
            return makeRequest('PATCH', path, data, authRequired);
        }

        function deleteRequest(path, data, authRequired) {
            data = (typeof data !== 'object') ? false : data;
            authRequired = (authRequired === true) ? true : false;
            return makeRequest('DELETE', path, data, authRequired);
        }

        function makeMultiPartRequest(method, path, data, authRequired) {

            var deferred = $q.defer();

            var request = {
                method: method,
                url: $rootScope.app.apiUrl + path,
                transformRequest: angular.identity
            };

            if (authRequired) {
                request.headers = {
                    'Content-Type': undefined,
                    'Authorization': 'Token ' + authToken.get(true)
                };
            } else {
                request.headers = {
                    'Content-Type': undefined
                };
            }

            var fd = new FormData();

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    fd.append(key, data[key]);
                }
            }

            request.data = fd;

            $http(request).then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(response) {
                    if (response.status === 403 && request.url.match(/\/auth\/logout\/$/) === null) {
                        destroyCookies();
                    }
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function postMultiPart(path, data, authRequired) {
            data = (typeof data !== 'object') ? false : data;
            authRequired = (authRequired === true) ? true : false;
            return makeMultiPartRequest('POST', path, data, authRequired);
        }

        function patchMultiPart(path, data, authRequired) {
            data = (typeof data !== 'object') ? false : data;
            authRequired = (authRequired === true) ? true : false;
            return makeMultiPartRequest('PATCH', path, data, authRequired);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('authService', authService);

    authService.$inject = ['$q', '$cookies', 'apiService', 'authToken'];

    function authService($q, $cookies, apiService, authToken) {

        return {
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,
            register: register,
            forgotPassword: forgotPassword,
            resetPassword: resetPassword,
            changePassword: changePassword
        };

        function isLoggedIn () {
            return (authToken.get(true) !== false) ? true : false;
        }

        function requestAuthToken (email, password) {

            var deferred = $q.defer();

            apiService.post('/login', {
                username: email,
                password: password
            }).then(
                function(response) {
                    deferred.resolve(response.session);
                },
                function(response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function setTocken (session) {
          let now = new Date();
          now.setHours(now.getHours() + 2);
          let expires = now;

          let token = session.key;
          // let expires = session.time;

          authToken.save(token, expires);
        }

        function login (email, password) {

            var deferred = $q.defer();

            $cookies.remove('usertype', {
                path: '/'
            });
            authToken.delete();

            requestAuthToken(email, password).then(
                function(session) {
                    setTocken(session);
                    deferred.resolve(session);
                },
                function(response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function register (name, username, email, password) {

            var deferred = $q.defer();

            apiService.post('/signup', {
              name: name,
              username: username,
              email: email,
              password: password
            }).then(
                function(response) {
                  setTocken(response.session);
                  deferred.resolve(response.session);
                },
                function(response) {
                  deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function forgotPassword (email) {

          var deferred = $q.defer();
          var data = { email: email };

          apiService.post('/login/forgot', data, false).then(
            function(response) {
              deferred.resolve(response);
            },
            function(response) {
              deferred.reject(response);
            }
          );

          return deferred.promise;
        }

        function resetPassword (email, password, key) {

          var deferred = $q.defer();
          var data = { email: email, password: password, key: key };

          apiService.post('/login/reset', data, false).then(
            function(response) {
              deferred.resolve(response);
            },
            function(response) {
              deferred.reject(response);
            }
          );

          return deferred.promise;
        }

        function changePassword (currentPassword, newPassword) {

          var deferred = $q.defer();
          var data = { currentPassword: currentPassword, newPassword: newPassword };

          apiService.post('/password/change/', data, false).then(
            function(response) {
              deferred.resolve(response);
            },
            function(response) {
              deferred.reject(response);
            }
          );

          return deferred.promise;
        }

        function logout () {

            var deferred = $q.defer();

            apiService.post('/auth/logout/', false, true).finally(function() {
                $cookies.remove('usertype', {
                    path: '/'
                });
                authToken.delete();
                deferred.resolve();
            });

            return deferred.promise;
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('authToken', authToken);

    authToken.$inject = ['$cookies'];

    function authToken($cookies) {
        
        var authToken;

        return {
            save: saveToken,
            delete: deleteToken,
            get: getToken
        };

        function saveToken(token, expires) {
            $cookies.put('token', token, {
                path: '/',
                expires: expires
            });
        }

        function deleteToken() {
            $cookies.remove('token', {
                path: '/'
            });
        }

        function getToken(forceCookieCheck) {

            if (authToken && !forceCookieCheck) {
                return authToken;
            }

            var token = $cookies.get('token');
            if (token) {
                authToken = token;
                return authToken;
            }

            return false;
        }
    }
})();

// (function() {
//     'use strict';
//
//     angular
//         .module('app.services')
//         .factory('sentimentService', sentimentService);
//
//     sentimentService.$inject = ['$q', 'apiService'];
//
//     function sentimentService($q, apiService) {
//
//         return {
//             getSentiment: getSentiment
//         };
//
//         function getSentiment() {
//
//             var deferred = $q.defer();
//
//             apiService.get('http://watson.wtst.io/sentiments/states?count=40&threshold=0.02&tickers=AAPL,AMZN,FB,GOOGL,NFLX,NVDA,PCLN,TSLA,TRIP,SRCL,AMAT,AMGN,AMZN,ATVI,AVGO,BBBY,BIDU,BIIB,BMRN,CA,CTSH,CTXS,DISCA,DISCK,DISH,DLTR,EA,EBAY,ENDP,ESRX,LRCX,LVNTA,MAR,MAT,MDLZ,MNST,MSFT,MU,MXIM,MYL', null, false).then(
//                 function( response ) {
//                     deferred.resolve(response);
//                 },
//                 function( response ) {
//                   deferred.reject(response);
//                 }
//             );
//
//             return deferred.promise;
//         }
//     }
// })();

(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage', '$location'];

    function settingsRun($rootScope, $localStorage, $location){


      // User Settings
      // -----------------------------------
      $rootScope.user = {
        name:     'John',
        job:      'ng-developer',
        picture:  'app/img/user/02.jpg'
      };

      // Hides/show user avatar on sidebar from any element
      $rootScope.toggleUserBlock = function(){
        $rootScope.$broadcast('toggleUserBlock');
      };

      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: 'Watstock',
        description: 'Intelligence trading',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: true,
          isFloat: false,
          asideHover: false,
          theme: null,
          asideScrollbar: false,
          isCollapsedText: false,
          headerHome: false
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp',

        rtUrl: 'http://rt.wtst.io',
        predictionsUrl: 'http://adjusted-predictions.wtst.io',
        historicalPredictionsUrl: 'http://historical-predictions.wtst.io',
        historicalStocksUrl: 'http://eod-stocks.wtst.io',
        companiesUrl: 'http://companies.wtst.io',
        newsUrl: 'http://yahoo-news.wtst.io',
        serverUrl: 'http://web.wtst.io',
        apiUrl: ' http://users.wtst.io:8000/api',
        templateDir: 'app/views/',
        hashUrl: $location.hash()
      };



      // Setup the layout mode
      // $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Restore layout settings
      if (angular.isDefined($localStorage.haloData)) {
          $rootScope.app.haloApiData = $localStorage.haloData;
      } else {
          $localStorage.haloData = $rootScope.app.haloApiData;
      }

      $rootScope.$watch('app.haloApiData', function() {
          $localStorage.haloData = $rootScope.app.haloApiData;
      }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils) {

        activate();

        ////////////////

        function activate() {
          var collapseList = [];

          // demo: when switch from collapse to hover, close all items
          var watchOff1 = $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });


          // Load menu from json file
          // -----------------------------------

          SidebarLoader.getMenu(sidebarReady);

          function sidebarReady(items) {
            $scope.menuItems = items;
          }

          // Handle sidebar and collapse items
          // ----------------------------------

          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }

            $scope.lastEventFromChild = isChild($index);

            return true;

          };

          // Controller helpers
          // -----------------------------------

            // Check item and children active state
            function isActive(item) {

              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }

            $scope.$on('$destroy', function() {
                watchOff1();
            });

        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar
              sidebarAddBackdrop();

            }

          });

          var eventOff1 = scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize.sidebar', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          var eventOff2 = $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';

            var watchOff1 = $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }

          scope.$on('$destroy', function() {
            // detach scope events
            eventOff1();
            eventOff2();
            watchOff1();
            // detach dom events
            $sidebar.off(eventName);
            $win.off('resize.sidebar');
            wrapper.off(sbclickEvent);
          });

        }

        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // -----------------------------------
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');

          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );

          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            
          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .success(onReady)
            .error(onError);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$scope'];
    function UserBlockController($scope) {

        activate();

        ////////////////

        function activate() {

          $scope.userBlockVisible = true;

          var detach = $scope.$on('toggleUserBlock', function(/*event, args*/) {

            $scope.userBlockVisible = ! $scope.userBlockVisible;

          });

          $scope.$on('$destroy', detach);
        }
    }
})();

/**=========================================================
 * Module: stocks,js
 * Angular Stocks company controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.stocks')
        .controller('StocksCompanyController', StocksCompanyController);

    //todo move to the moment library
    var businessAdd = function (data, days) {
      var signal = days<0?-1:1;
      days = Math.abs(days);
      var d = moment(data).clone().add(Math.floor(days / 5) * 7 * signal, 'd');
      var remaining = days % 5;
      while(remaining){
        d.add(signal, 'd');
        if(d.day() !== 0 && d.day() !== 6)
          remaining--;
      }
      return d;
    };

    var businessSubtract = function(data, days){
      return businessAdd(data, -days);
    };


  StocksCompanyController.$inject = ['$rootScope', '$location', '$q', '$stateParams', '$timeout', '$http', 'stocksService'];
    function StocksCompanyController($rootScope, $location, $q, $stateParams, $timeout, $http, stocksService) {
      var vm = this;

      vm.ticker = $stateParams.id;
      vm.companyInfo = {
        bid: 0,
        ask: 0,
        last: 0,
        high: 0,
        low: 0,
        prevClose: 0,
        marketCap: 0,
        volume: 0
      };
      vm.change = 0;
      vm.changePercent = 0;
      vm.predictionCange = 0;
      $rootScope.app.hashUrl = $location.url();

      stocksService.getCompanyBySymbol(vm.ticker)
          .then(function (tickers) {
            if (!tickers.length) {
              return $q.reject(tickers);
            }

            vm.companyInfo = Object.assign(vm.companyInfo, tickers[0]);
          });

      stocksService.getPredictions(vm.ticker)
          .then(function (predictions) {
            vm.predictions = predictions[vm.ticker];
          });

      var firsDay = businessSubtract(moment().utc(), 5).format('YYYY-MM-DD');

      stocksService.getHistoricalPredictions(vm.ticker, firsDay)
          .then(function (historical) {
            vm.historical = historical;
          });

      stocksService.getHistoricalStocks(vm.ticker, businessSubtract(moment().utc(), 1).format('YYYY-MM-DD'))
          //todo use new api for all values
          .then(function (historicalPredictions) {
            if (historicalPredictions[vm.ticker].length) {
              vm.companyInfo.high = historicalPredictions[vm.ticker][0][2];
              vm.companyInfo.low = historicalPredictions[vm.ticker][0][3];
              vm.companyInfo.prevClose = historicalPredictions[vm.ticker][0][4];
              vm.companyInfo.volume = historicalPredictions[vm.ticker][0][5];

              vm.previousClose = {
                date: historicalPredictions[vm.ticker][0][0],
                price: historicalPredictions[vm.ticker][0][4]
              };
            }
          });

      var serverConnection;


      function getYahooQuotes (ticker) {
        var url = 'http://query.yahooapis.com/v1/public/yql';
        var data = encodeURIComponent('select * from yahoo.finance.quotes where symbol in ("' + ticker + '")');
        var params = "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

        return $http({
          method: 'GET',
          url: url + '?q=' + data + params
        }).then(function successCallback(response) {
          return response.data;
        });
      }

      getYahooQuotes(vm.ticker)
          .then(function (quotes) {
            if (quotes.query.results) {
              vm.companyInfo.bid = parseFloat(quotes.query.results.quote.Bid);
              vm.companyInfo.ask = parseFloat(quotes.query.results.quote.Ask);
              vm.companyInfo.last = parseFloat(quotes.query.results.quote.LastTradePriceOnly);
              vm.companyInfo.marketCap = quotes.query.results.quote.MarketCapitalization;
            }
          });

      connectRealTime();

      this.$onDestroy = function () {
        if (serverConnection) serverConnection.disconnect();
      };

      function connectRealTime() {
        var STOCKS_REAL_TIME_URL = $rootScope.app.rtUrl + ':3000';

        serverConnection = io(STOCKS_REAL_TIME_URL);

        serverConnection.on('quote', updateTicker);

        serverConnection.on('connect', function() {
          serverConnection.emit('subscribe', [vm.ticker]);
        });

        function updateTicker (data) {
          if (data.ticker !== vm.ticker) return;

          $timeout(function () {
            var priceStyle = '';
            if (vm.companyInfo[data.type] < data.price) priceStyle = 'text-success';
            if (vm.companyInfo[data.type] > data.price) priceStyle = 'text-danger';

            var priceElement = $('#value_' + data.type);
            if (priceStyle && priceElement.length) {
              priceElement.text(data.price.toFixed(2));

              if (priceElement.get(0).timer) clearTimeout(priceElement.get(0).timer);
              priceElement.removeClass('text-success text-danger').addClass(priceStyle);
              priceElement.get(0).timer = setTimeout(function(){
                priceElement.removeClass('text-success text-danger');
              }, 2000);
            }

            vm.companyInfo[data.type] = data.price;

            var price = vm.companyInfo.prevClose;
            //get change for tomorrow
            if (price !== 0) {
              vm.change = vm.companyInfo.last - price;
              vm.changePercent = (100 * vm.change/price).toFixed(2);
            }

            if (vm.predictions && vm.predictions.length) {
              let predictionChange = vm.predictions[1].prediction - vm.companyInfo.last;
              vm.predictionCange = (100 * predictionChange/vm.companyInfo.last).toFixed(2);
            }

          });
        }

      }

    }
})();

/**=========================================================
 * Module: stocks,js
 * Angular Stocks table controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.stocks')
        .component('stocksNews', {
          templateUrl: 'app/views/stocks.news.html',
          bindings: {
            ticker: '<'
          },
          controller: StocksNewsController,
          controllerAs: 'news'
        });

  StocksNewsController.$inject = ['$rootScope', '$timeout'];
    function StocksNewsController($rootScope, $timeout) {
      var vm = this;

      vm.list = [];

      init(vm.ticker);

      var serverConnection;


      function init(ticker) {
        var STOCKS_REAL_TIME_URL = $rootScope.app.newsUrl + ':3000';

        var serverConnection = io(STOCKS_REAL_TIME_URL);
        serverConnection.on('connect', function() {
          serverConnection.emit('ticker', ticker);
        });
        serverConnection.on('news', updateTicker);

        function updateTicker (data) {
          if (typeof data === 'string') data = JSON.parse(data);

          if (data.news) {
            $timeout(function () {
              vm.list = [].concat(data.news, vm.list);
            });
          }
        }
      }

      this.$onDestroy = function () {
        if (serverConnection) serverConnection.disconnect();
      };

    }
})();

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

/**=========================================================
 * Module: stocks,js
 * Angular Stocks table controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.stocks')
        .component('stocksTable', {
          templateUrl: 'app/views/stocks.table.html',
          controller: StocksTableController,
          controllerAs: 'stocks'
        });

  StocksTableController.$inject = ['$rootScope', '$timeout', 'stocksService'];
    function StocksTableController($rootScope, $timeout, stocksService) {
      var vm = this;

      vm.tickers = [];
      vm.realTime = false;
      vm.forecastDay = -1;

      vm.showTable = showTable;
      vm.getForecast = getForecast;

      var serverConnection;

      this.$onDestroy = function () {
        if (serverConnection) serverConnection.disconnect();
      };

      var tickers = stocksService.getCompanies()
        .then(function (tickers) {
          vm.tickers = tickers
              .filter(function(ticker) { //todo remove Microsoft
                return ticker.tickerSymbol !== "MSFT";
              })
              .map(function(ticker) {
                ticker.ask = 0;
                ticker.bid = 0;
                ticker.last = 0;
                ticker.date = moment().format();
                return ticker;
              });
          return vm.tickers;
        })
        .then(function (tickers) {
          var symbols = tickers.map(function (item) { return item.tickerSymbol;});

          //load predictions
          stocksService.getPredictions(symbols)
              .then(function (predictions) {
                tickers.forEach(function (item) {
                  item.predictions = predictions[item.tickerSymbol];
                });
              });

          return tickers;
        });

      showTable(0);

      function showTable(forecastDay) {
        if (vm.forecastDay === forecastDay) return;

        vm.forecastDay = forecastDay;
        if (forecastDay === 0) {
          connectRealTime();
        } else {
          if (serverConnection) serverConnection.disconnect();
        }
      }

      function getForecast(item) {
        if (vm.forecastDay > 0) {
          return getForecasts(item, vm.forecastDay);
        }

        return getToday(item);
      }


      function getToday (item) {
        return {
          trend: '',
          prediction: item.last,
          change: 0,
          changePercent: '0.0',
          prediction_date: item.date
        };
      }


      function getForecasts(item, day) {
        if(!item.predictions) {
          return getToday(item);
        }
        var forecast = item.predictions[day-1];

        if(!forecast) {
          return getToday(item);
        }

        if (item.last === 0) {
          return {
            trend: '',
            prediction: forecast.prediction,
            change: 0,
            changePercent: (0).toFixed(2),
            prediction_date: forecast.prediction_date
          };
        }

        var change = forecast.prediction - item.last;

        return {
          trend: change > 0 ? 'text-success' : 'text-danger',
          prediction: forecast.prediction,
          change: change,
          changePercent: (100 * change /item.last).toFixed(2),
          prediction_date: forecast.prediction_date
        };
      }

      function connectRealTime() {
        var STOCKS_REAL_TIME_URL = $rootScope.app.rtUrl + ':3000';

        serverConnection = io(STOCKS_REAL_TIME_URL);

        serverConnection.on('quote', updateTicker);

        serverConnection.on('connect', function() {
          tickers.then(function () {
            var tickers = vm.tickers.map(function(ticker) {return ticker.tickerSymbol;});
            serverConnection.emit('subscribe', tickers);
          });
        });

        function updateTicker (data) {
          if (!vm.realTime) {
            if (data.source === 'source') $timeout(function () { vm.realTime = true; });
          }

          var index = vm.tickers.findIndex(function (t) { return data.ticker === t.tickerSymbol; });

          if (index >= 0) {
             var date = new Date(Math.floor(data.timestamp * 1000)).toISOString();

            var time = moment(vm.tickers[index].date).format('h:mm:ss');
            var quoteDate = moment(vm.tickers[index].date).format('YYYY-MM-DD');
            var price = '$' + parseFloat(data.price).toFixed(2);

            var tickerElement = $('.ticker.'+ data.ticker);
            var priceElement = tickerElement.find('.ticker_' + data.type);
            var dateElement = tickerElement.find('.ticker_date');
            var timeElement = tickerElement.find('.ticker_time');

            var priceStyle = '';
            if (vm.tickers[index][data.type] < data.price) priceStyle = 'text-success';
            if (vm.tickers[index][data.type] > data.price) priceStyle = 'text-danger';

            priceElement.text(price);
            dateElement.text(quoteDate);
            timeElement.text(time);

            if (priceStyle && priceElement.length) {
              if (priceElement.get(0).timer) clearTimeout(priceElement.get(0).timer);
              priceElement.removeClass('text-success text-danger').addClass(priceStyle);
              priceElement.get(0).timer = setTimeout(function(){
                priceElement.removeClass('text-success text-danger');
              }, 2000);
            }

            vm.tickers[index][data.type] = data.price;
            vm.tickers[index].date = date;
          }
        }

      }

    }
})();

(function() {
  'use strict';

  angular
      .module('app.stocks')
      .factory('stocksService', stocksService);

  stocksService.$inject = ['$rootScope', '$resource'];

  function stocksService($rootScope, $resource) {

    var VOCABULARY_URL = $rootScope.app.companiesUrl;
    var companies = $resource(VOCABULARY_URL + '/:ticker', {ticker: '@ticker'}, {
      'bySymbol': {
        method: 'GET',
        isArray: true,
        cache: true
      },
      'all': {
        method: 'GET',
        isArray: true,
        cache: true
      }
    });

    var PREDICTIONS_URL = $rootScope.app.predictionsUrl;
    var predictions = $resource(PREDICTIONS_URL + '/:tickers', {tickers: '@tickers'}, {
      query: {
        method: 'GET'
      }
    });

    var HISTORICAL_PREDICTIONS_URL = $rootScope.app.historicalPredictionsUrl;
    var historicalPredictions = $resource(HISTORICAL_PREDICTIONS_URL + '/:ticker/:date', {ticker: '@ticker', date: '@date'}, {
      query: {
        method: 'GET'
      }
    });


    var HISTORICAL_STOCKS_URL = $rootScope.app.historicalStocksUrl;
    var historicalStocks = $resource(HISTORICAL_STOCKS_URL + '/:ticker/:date', {ticker: '@ticker', date: '@date'}, {
      query: {
        method: 'GET'
      }
    });

    return {
      getCompanyBySymbol: function (ticker) {
        return companies.bySymbol({ticker:ticker}).$promise;
      },
      getCompanies: function () {
        return companies.all().$promise;
      },

      getPredictions: function (tickers) {
        if (Array.isArray(tickers)) { tickers = tickers.join(','); }
        return predictions.query({tickers: tickers}).$promise;
      },

      getHistoricalPredictions: function (ticker, date) {
        return historicalPredictions.query({ticker: ticker, date: date}).$promise;
      },

      getHistoricalStocks: function (ticker, date) {
        return historicalStocks.query({ticker: ticker, date: date}).$promise;
      }
    };

  }
})();

/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            }, attributes.triggerResize || 300);
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },

          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       'English',
          'es_AR':    'Español'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'app.sidebar'
            /*...*/
        ]);
})();

// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('Controller', Controller);

    Controller.$inject = ['$log'];
    function Controller($log) {
        // for controllerAs syntax
        // var vm = this;

        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');
        }
    }
})();
