'use strict';

(function () {

    angular.module('scFeatureBook', ['ngRoute', 'ngSanitize'])
        .config(config)
        .controller('FeatureBookController', FeatureBookController)
        .controller('FeatureController', FeatureController);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html'
            })
            .when('/feature/:path*', {
                templateUrl: 'views/feature.html',
                controller: 'FeatureController',
                resolve: {
                    feature: featureResolver
                }
            })
            .otherwise({
                redirectTo: '/home'
            });

        featureResolver.$inject = ['$route', 'featureBookService'];

        function featureResolver($route, featureBookService) {
            return featureBookService.findByPath($route.current.pathParams.path);
        }
    }

    FeatureBookController.$inject = ['$scope', '$window', 'featureBookService'];

    function FeatureBookController($scope, $window, featureBookService) {
        featureBookService.summary().then(function (summary) {
            $scope.summary = summary;
            $window.document.title = summary.title + ' ' + (summary.version || '');
        });

        featureBookService.findAll().then(function (featuresTree) {
            $scope.featuresTree = featuresTree;
        })
    }

    FeatureController.$inject = ['$scope', '$route'];

    function FeatureController($scope, $route) {
        $scope.feature = $route.current.locals.feature.data;
    }

})();