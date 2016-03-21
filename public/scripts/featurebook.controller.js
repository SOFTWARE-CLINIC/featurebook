(function () {
  'use strict';

  angular.module('scFeatureBook')
    .controller('FeatureBookController', FeatureBookController);

  FeatureBookController.$inject = ['$scope', '$window', 'featureBookService'];

  function FeatureBookController($scope, $window, featureBookService) {

    function activate() {
      featureBookService.getMetadata().then(function (metadata) {
        $scope.metadata = metadata;
        $window.document.title = metadata.title + ' ' + (metadata.version || '');
      });

      featureBookService.getSpecTree().then(function (specTree) {
        $scope.featuresTree = specTree;
      });
    }

    activate();
  }

})();
