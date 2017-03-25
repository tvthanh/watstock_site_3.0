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
