(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('authToken', authToken);

    authToken.$inject = ['$cookies'];

    function authToken($cookies) {
        
        var authToken;

        return {
            save: saveToken,
            delete: deleteToken,
            get: getToken
        };

        function saveToken(token, expires) {
            $cookies.put('token', token, {
                path: '/',
                expires: expires
            });
        }

        function deleteToken() {
            $cookies.remove('token', {
                path: '/'
            });
        }

        function getToken(forceCookieCheck) {

            if (authToken && !forceCookieCheck) {
                return authToken;
            }

            var token = $cookies.get('token');
            if (token) {
                authToken = token;
                return authToken;
            }

            return false;
        }
    }
})();
