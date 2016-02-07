(function () {
  'use strict';

  /* global angular */
  angular.module('scFeatureBook')
    .filter('highlightGherkinVariables', highlightGherkinVariablesFilter);

  highlightGherkinVariablesFilter.$inject = ['$sce'];

  var variableRegex = /<([_a-zA-Z][^>]*)>/g;

  function highlightGherkinVariablesFilter($sce) {
    return function (input) {
      return $sce.trustAsHtml(
        input.replace(variableRegex, '<span class="featurebook-var">&lt;$1&gt;</span>'));
    };
  }

})();
