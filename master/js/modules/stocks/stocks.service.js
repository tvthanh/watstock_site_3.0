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
