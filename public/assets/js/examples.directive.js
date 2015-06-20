'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .directive('examples', examplesDirectiveFactory);

    // TODO Rename examples directive to dataTable
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