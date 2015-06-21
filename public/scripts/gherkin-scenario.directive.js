'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .directive('gherkinScenario', gherkinScenarioDirectiveFactory);

    function gherkinScenarioDirectiveFactory() {
        return {
            restrict: 'E',
            templateUrl: 'views/gherkin-scenario.html',
            replace: true,
            scope: {
                scenario: '=ngModel'
            },
            link: function stepDirectiveLinkFunction(scope) {
                scope.isOutline = function isOutline() {
                    return angular.isDefined(scope.scenario.examples);
                };
            }
        };
    }

})();