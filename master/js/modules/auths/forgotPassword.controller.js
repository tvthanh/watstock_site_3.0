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
