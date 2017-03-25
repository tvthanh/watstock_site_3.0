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
