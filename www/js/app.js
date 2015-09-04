/* globals angular */
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving
// Angular modules
// 'starter' is the name of this angular module example (also set in a <body>
// attribute in index.html) the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
    .controller('AppCtrl', function ($scope, ParseHttpService) {

        $scope.currentUser = null;
        $scope.apiResponseData = {};
        $scope.uiData = {};

        function _alertHandler(_error) {
            alert("ERROR " + JSON.stringify(_error, null, 2));
        }
        /**
         * logs the user into the application
         */
        $scope.doLogin = function () {
            return ParseHttpService.login().then(function (_response) {
                $scope.currentUser = _response;
                $scope.apiResponseData = _response;
            }, _alertHandler);
        }

        /**
         * [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        $scope.postStuff = function () {
            return ParseHttpService.getStuff().then(function (_response) {
                $scope.apiResponseData = _response;
            }, _alertHandler);
        }

        /**
         * [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        $scope.putStuff = function () {
            return ParseHttpService.putStuff($scope.uiData)
                .then(function (_response) {
                    $scope.apiResponseData = _response;
                }, _alertHandler);
        }

        /**
         */
        $scope.getStuff = function (_id) {
            return ParseHttpService.getStuff(_id).then(function (_response) {
                $scope.apiResponseData = _response;
            }, _alertHandler);
        }

        /**
         */
        $scope.getStuffList = function () {
            return ParseHttpService.getStuff("").then(function (_response) {
                $scope.apiResponseData = _response;
            }, _alertHandler);
        }

        /**
         */
        $scope.deleteStuff = function () {}

    })
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory
            // bar above the keyboard for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .service('ParseHttpService', function ($http) {
        var baseURL = "https://api.parse.com/1/";
        var authenticationHeaders = PARSE__HEADER_CREDENTIALS;

        return {
            /**
             * [[Description]]
             * @returns {Promise} [[Description]]
             */
            login: function () {

                var credentials = {
                    "username": "admin",
                    "password": "test"
                };

                var settings = {
                    method: 'GET',
                    url: baseURL + 'login',
                    headers: authenticationHeaders,
                    // params are for query string parameters
                    params: credentials
                };

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http(settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('login', response);
                        return response.data;
                    });
            },
            /**
             * updates a specific item in the parse database based on the 
             * objectId specified
             * 
             * @param   {Object}  _params id, nameValue, roomValue
             * @returns {Promise} [[Description]]
             */
            putStuff: function (_params) {

                // for PUT, we need to specify the id of the object we 
                // want to update
                var settings = {
                    method: 'PUT',
                    url: baseURL + 'classes/stuff/' + _params.objectId,
                    headers: authenticationHeaders,
                    data: {
                        "name": (_params.nameValue ? _params.nameValue : JSON.null),
                        "room": (_params.roomValue ? _params.roomValue : JSON.null),
                    }
                };

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http(settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('putstuff', response);
                        return response.data;
                    });
            },
            /**
             * gets a specific stuff item based on the id provided, if no id then 
             * return all stuff items
             * 
             * @param   {String}   _id object id in parse
             * @returns {Promise} [[Description]]
             */
            getStuff: function (_id) {

                // if an id is passed in then use it when querying
                // stuff data
                var settings = {
                    method: 'GET',
                    url: baseURL + 'classes/stuff/' + _id,
                    headers: authenticationHeaders,
                };

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http(settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('getStuff', response);
                        return response.data;
                    });
            },
            /**
             * deletes item stuff from parse
             * 
             * @param   {String}   _id object id in parse
             * @returns {Promise} [[Description]]
             */
            deleteStuff: function (_id) {
                var settings = {
                    method: 'DELETE',
                    url: baseURL + 'classes/stuff/' + _id,
                    headers: authenticationHeaders,
                };

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http(settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('getStuff', response);
                        return response.data;
                    });
            }
        }
    });
