'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .factory('featureBookService', featureBookServiceFactory);

    featureBookServiceFactory.$inject = ['$http'];

    function featureBookServiceFactory($http) {
        return {
            metadata: metadata,
            summary: summary,
            findAll: findAll,
            findByPath: findByPath
        };

        function metadata() {
            return $http.get('api/rest/metadata').then(function (response) {
                return response.data;
            });
        }

        function summary() {
            return $http.get('api/rest/summary').then(function (response) {
                return response.data;
            });
        }

        function findAll() {
            return $http.get('api/rest/feature/tree').then(function (response) {
                return response.data.items;
            });
        }

        function findByPath(featurePath) {
            return $http.get('api/rest/feature/parsed/' + encodeURIComponent(featurePath)).then(function (response) {
                return response.data;
            });
        }
    }

})();