(function () {
  'use strict';

  angular.module('scFeatureBook')
    .controller('FeatureViewerController', FeatureViewerController);

  FeatureViewerController.$inject = ['$scope', '$route', '$location'];

  function FeatureViewerController($scope, $route, $location) {

    $activate();

    function $activate() {
      $scope.featureResponse = $route.current.locals.feature;

      $scope.hasError = function hasError() {
        return $scope.featureResponse.status !== 'success';
      };
    }
  }

})();
