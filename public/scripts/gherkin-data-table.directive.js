(function () {
  'use strict';

  /* global angular */
  angular.module('scFeatureBook')
    .directive('gherkinDataTable', gherkinDataTableDirectiveFactory);

  function gherkinDataTableDirectiveFactory() {
    return {
      restrict: 'E',
      templateUrl: 'views/gherkin-data-table.html',
      replace: true,
      scope: {
        tableHeader: '=',
        tableBody: '='
      }
    };
  }

})();
