(function () {
  'use strict';

  angular.module('scFeatureBook')
    .directive('feature', featureNodeDirectiveFactory);

  featureNodeDirectiveFactory.$inject = ['$compile', '$routeParams'];

  function featureNodeDirectiveFactory($compile, $routeParams) {
    return {
      restrict: 'E',
      templateUrl: 'views/feature-node.html',
      link: function featureDirectiveLinkFunction(scope, element) {
        scope.isActive = function isActive(feature) {
          return $routeParams.path === feature.path;
        };
        if (scope.feature.children) {
          element.append($compile('<feature-tree ng-model="feature.children"></feature-tree>')(scope));
        }
      }
    };
  }

})();
