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
