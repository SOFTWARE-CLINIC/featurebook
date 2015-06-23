'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook', ['ngRoute', 'ngSanitize', 'ui.ace'])
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
            .when('/viewer/:path*', {
                templateUrl: 'views/feature-viewer.html',
                controller: 'FeatureViewerController',
                resolve: {
                    feature: featureResolver
                }
            })
            .when('/editor/:path*', {
                templateUrl: 'views/feature-editor.html',
                controller: 'FeatureEditorController',
                resolve: {
                    content: contentResolver
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
            return featureBookService.getModelByPath($route.current.pathParams.path);
        }

        contentResolver.$inject = ['$route', 'featureBookService'];

        function contentResolver($route, featureBookService) {
            return featureBookService.getContentByPath($route.current.pathParams.path);
        }
    }

})();