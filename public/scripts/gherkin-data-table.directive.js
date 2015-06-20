'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .directive('gherkinDataTable', gherkinDataTableDirectiveFactory);

    function gherkinDataTableDirectiveFactory() {
        return {
            restrict: 'E',
            templateUrl: 'views/gherkin-data-table.html',
            replace: true,
            scope: {
                data: '=ngModel'
            }
        };
    }

})();