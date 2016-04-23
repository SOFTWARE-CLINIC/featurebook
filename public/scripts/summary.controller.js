(function () {
  'use strict';

  angular.module('scFeatureBook')
    .controller('SummaryController', SummaryController);

  SummaryController.$inject = ['$scope', '$route'];

  var DEFAULT_SUMMARY_MESSAGE =
    '<p>You can put some content here by creating the <code>SUMMARY.md</code> Markdown file.</p>';

  function SummaryController($scope, $route) {

    activate();

    function activate() {
      $scope.summary = $route.current.locals.summary || DEFAULT_SUMMARY_MESSAGE;
    }
  }

})();
