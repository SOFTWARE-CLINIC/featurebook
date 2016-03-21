(function () {
  'use strict';

  angular.module('scFeatureBook')
    .factory('featureBookService', featureBookServiceFactory);

  featureBookServiceFactory.$inject = ['$http'];

  function featureBookServiceFactory($http) {
    return {
      getMetadata: getMetadata,
      getSummary: getSummary,
      getSpecTree: getSpecTree,
      getFeature: getFeature,
      getContentByPath: getContentByPath
    };

    function getMetadata() {
      return $http.get('api/rest/metadata').then(function (response) {
        return response.data;
      });
    }

    function getSpecTree() {
      return $http.get('api/rest/spec/tree').then(function (response) {
        return response.data.children;
      });
    }

    function getFeature(path) {
      return $http.get('api/rest/feature/' + encodeURIComponent(path)).then(function (response) {
        return response.data;
      });
    }

    function getContentByPath(path) {
      return $http.get('api/rest/raw/' + encodeURIComponent(path)).then(function (response) {
        return response.data;
      });
    }

    function getSummary(path) {
      return $http.get('api/rest/summary/' + (path ? encodeURIComponent(path) : '')).then(function (response) {
        return response.data;
      }, function (response) {
        return null;
      });
    }

  }

})();
