'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .controller('FeatureController', FeatureController);

    FeatureController.$inject = ['$scope', '$route'];

    function FeatureController($scope, $route) {

        $activate();

        function $activate() {
            $scope.feature = $route.current.locals.feature;
        }
    }

})();