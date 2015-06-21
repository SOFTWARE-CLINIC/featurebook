'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .directive('gherkinStep', gherkinStepDirectiveFactory);

    function gherkinStepDirectiveFactory() {
        return {
            restrict: 'E',
            templateUrl: 'views/gherkin-step.html',
            replace: true,
            scope: {
                step: '=ngModel'
            },
            link: function stepDirectiveLinkFunction(scope) {
                scope.hasDataTable = function hasDataTable() {
                    var step = scope.step;
                    return step.dataTable && step.dataTable.length > 0;
                };
                scope.hasDocString = function hasDocString() {
                    return angular.isDefined(scope.step.docString);
                };
            }
        };
    }

})();