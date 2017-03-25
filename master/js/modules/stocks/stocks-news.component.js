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
