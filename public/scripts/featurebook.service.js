(function () {
    'use strict';

    /* global angular */
    angular.module('scFeatureBook')
        .factory('featureBookService', featureBookServiceFactory);

    featureBookServiceFactory.$inject = ['$http'];

    function featureBookServiceFactory($http) {
        return {
            metadata: metadata,
            getSummaryByPath: getSummaryByPath,
            findAll: findAll,
            getModelByPath: getModelByPath,
            getContentByPath: getContentByPath,
            save: save
        };

        function metadata() {
            return $http.get('api/rest/metadata').then(function (response) {
                return response.data;
            });
        }

        function findAll() {
            return $http.get('api/rest/feature/tree').then(function (response) {
                return response.data.items;
            });
        }

        function getModelByPath(path) {
            return $http.get('api/rest/feature/parsed/' + encodeURIComponent(path)).then(function (response) {
                return response.data;
            });
        }

        function getContentByPath(path) {
            return $http.get('api/rest/raw/' + encodeURIComponent(path)).then(function (response) {
                return response.data;
            });
        }

        function getSummaryByPath(path) {
            return $http.get('api/rest/summary/' + (path ? encodeURIComponent(path) : '')).then(function (response) {
                return response.data;
            }, function (response) {
                return null;
            });
        }

        function save(path, content) {
            return $http({
                method: 'POST',
                url: '/api/rest/raw/' + encodeURIComponent(path),
                data: content,
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
        }
    }

})();