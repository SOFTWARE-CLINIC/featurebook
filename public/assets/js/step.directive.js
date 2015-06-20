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