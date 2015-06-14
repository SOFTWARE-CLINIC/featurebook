'use strict';

(function () {

    angular.module('scFeatureBook')
        .directive('examples', examplesDirectiveFactory);

    function examplesDirectiveFactory() {
        return {
            restrict: 'E',
            templateUrl: 'views/examples.html',
            replace: true,
            scope: {
                examples: '=ngModel'
            }
        };
    }

})();