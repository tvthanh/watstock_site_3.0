/**=========================================================
 * Module: register.controller.js
 * Demo for register account api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auths')
        .controller('RegisterFormController', RegisterFormController);

    RegisterFormController.$inject = ['$http', '$state', 'authService'];

    function RegisterFormController($http, $state, authService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';

            vm.register = function() {
                vm.authMsg = '';

                if (vm.registerForm.$valid) {

                  authService.register(
                      vm.account.name,
                      vm.account.username,
                      vm.account.email,
                      vm.account.password
                  )
                    .then(function() {
                        $state.go('app.home');
                    }, function(errors) {
                        if (errors.data && errors.data.message) {
                          vm.authMsg = errors.data.message;
                        } else {
                          vm.authMsg = 'Server Request Error';
                        }
                    });
                } else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.registerForm.account_name.$dirty = true;
                    vm.registerForm.account_username.$dirty = true;
                    vm.registerForm.account_email.$dirty = true;
                    vm.registerForm.account_password.$dirty = true;

                }
            };
        }
    }
})();
