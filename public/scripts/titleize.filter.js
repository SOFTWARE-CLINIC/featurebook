(function () {
  'use strict';

  /* global angular */
  angular.module('scFeatureBook')
    .filter('titleize', titleizeFilter);

  function titleizeFilter() {
    return function (input) {
      var withoutUnderscores = input.replace(/_/g, ' ');
      var uppercased = withoutUnderscores.charAt(0).toUpperCase() + withoutUnderscores.slice(1);
      return trimFileExtension(uppercased);
    };
  }

  function trimFileExtension(input) {
    return input.replace(/\.feature/g, '');
  }

})();
