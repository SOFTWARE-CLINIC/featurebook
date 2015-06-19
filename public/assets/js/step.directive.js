'use strict';

(function () {

    angular.module('scFeatureBook')
        .directive('step', stepDirectiveFactory);

    function stepDirectiveFactory() {
        return {
            restrict: 'E',
            templateUrl: 'views/step.html',
            replace: true,
            scope: {
                step: '=ngModel'
            }
        };
    }

})();