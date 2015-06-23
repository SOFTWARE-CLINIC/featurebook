'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .controller('FeatureViewerController', FeatureViewerController);

    FeatureViewerController.$inject = ['$scope', '$route', '$location'];

    function FeatureViewerController($scope, $route, $location) {

        $activate();

        function $activate() {
            $scope.feature = $route.current.locals.feature;

            $scope.edit = function edit() {
                $location.path('/editor/' + $route.current.params.path);
            };
        }
    }

})();