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
