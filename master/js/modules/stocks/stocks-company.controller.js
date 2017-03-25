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
