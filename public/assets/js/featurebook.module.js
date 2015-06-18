'use strict';

(function () {

    angular.module('scFeatureBook', ['ngRoute', 'ngSanitize'])
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                resolve: {
                    summary: summaryResolver
                }
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

        summaryResolver.$inject = ['featureBookService'];

        function summaryResolver(featureBookService) {
            return featureBookService.summary();
        }

        featureResolver.$inject = ['$route', 'featureBookService'];

        function featureResolver($route, featureBookService) {
            return featureBookService.findByPath($route.current.pathParams.path);
        }
    }

})();