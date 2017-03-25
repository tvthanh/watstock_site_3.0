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
