'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$route'];

    function HomeController($scope, $route) {

        $activate();

        function $activate() {
            $scope.summary = $route.current.locals.summary;
        }
    }

})();