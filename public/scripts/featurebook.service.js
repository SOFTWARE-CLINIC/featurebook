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
      getSpecTree: getSpecTree,
      getModelByPath: getModelByPath,
      getContentByPath: getContentByPath
    };

    function metadata() {
      return $http.get('api/rest/metadata').then(function (response) {
        return response.data;
      });
    }

    function getSpecTree() {
      return $http.get('api/rest/spec/tree').then(function (response) {
        return response.data.children;
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

  }

})();
