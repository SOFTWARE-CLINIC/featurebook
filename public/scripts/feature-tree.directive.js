'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .directive('featureTree', featureTreeDirectiveFactory);

    function featureTreeDirectiveFactory() {
        return {
            restrict: 'E',
            templateUrl: 'views/feature-tree.html',
            replace: true,
            transclude: true,
            scope: {
                tree: '=ngModel'
            }
        };
    }

})();