'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .controller('FeatureBookController', FeatureBookController);

    FeatureBookController.$inject = ['$scope', '$window', 'featureBookService'];

    function FeatureBookController($scope, $window, featureBookService) {

        $activate();

        function $activate() {
            featureBookService.metadata().then(function (metadata) {
                $scope.metadata = metadata;
                $window.document.title = metadata.title + ' ' + (metadata.version || '');
            });

            featureBookService.findAll().then(function (featuresTree) {
                $scope.featuresTree = featuresTree;
            });
        }

    }

})();