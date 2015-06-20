'use strict';

(function () {

    /* global angular */
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
                if (scope.feature.items.length > 0) {
                    element.append($compile('<feature-tree ng-model="feature.items"></feature-tree>')(scope));
                }
            }
        };
    }


})();