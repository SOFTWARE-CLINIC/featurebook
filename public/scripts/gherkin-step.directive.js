(function () {
  'use strict';

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
      link: function gherkinStepDirectiveLinkFunction(scope) {
        scope.hasDataTable = function hasDataTable() {
          return angular.isDefined(scope.step.argument)
            && scope.step.argument.type === 'DataTable';
        };
        scope.hasDocString = function hasDocString() {
          return angular.isDefined(scope.step.argument)
            && scope.step.argument.type === 'DocString';
        };
      }
    };
  }

})();
