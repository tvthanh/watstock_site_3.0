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
              onEnter: function($rootScope){
                $rootScope.app.layout.headerHome = true;
              },
              onExit: function($rootScope){
                $rootScope.app.layout.headerHome = false;
              }
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
