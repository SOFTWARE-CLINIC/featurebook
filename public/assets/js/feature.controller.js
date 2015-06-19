'use strict';

(function () {

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