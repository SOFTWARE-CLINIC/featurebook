(function () {
  'use strict';

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
      }
    };
  }

})();
