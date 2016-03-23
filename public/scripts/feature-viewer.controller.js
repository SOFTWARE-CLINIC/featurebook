(function () {
  'use strict';

  angular.module('scFeatureBook')
    .controller('FeatureViewerController', FeatureViewerController);

  FeatureViewerController.$inject = ['$scope', '$route'];

  function FeatureViewerController($scope, $route) {

    activate();

    function activate() {
      $scope.featureResponse = $route.current.locals.feature;
      $scope.hasError = function () {
        return $scope.featureResponse.status !== 'success';
      };
    }
  }

})();
