'use strict';

(function () {

    angular.module('scFeatureBook')
        .factory('featureBookService', featureBookServiceFactory);

    featureBookServiceFactory.$inject = ['$http'];

    function featureBookServiceFactory($http) {
        return {
            summary: summary,
            findAll: findAll,
            findByPath: findByPath
        };

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
            return $http.get('api/rest/feature/parsed/' + encodeURIComponent(featurePath));
        }
    }

})();