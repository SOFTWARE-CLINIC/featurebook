'use strict';

(function () {

    angular.module('scFeatureBook', ['ngRoute', 'ngSanitize'])
        .config(config)
        .controller('FeatureBookController', FeatureBookController)
        .controller('FeatureController', FeatureController)
        .directive('featureTree', featureTreeDirectiveFactory)
        .directive('feature', featureDirectiveFactory)
        .filter('encodeURIComponent', encodeURIComponentFilter);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html'
            })
            .when('/feature/:path', {
                templateUrl: 'views/feature.html',
                controller: 'FeatureController',
                resolve: {
                    feature: featureResolver
                }
            })
            .otherwise({
                redirectTo: '/home'
            });

        featureResolver.$inject = ['$route', '$http'];

        function featureResolver($route, $http) {
            return $http.get('api/rest/feature/parsed/' + encodeURIComponent($route.current.params.path));
        }
    }

    function featureTreeDirectiveFactory() {
        return {
            restrict: 'E',
            template: '<ul><feature ng-repeat="feature in tree"></feature></ul>',
            replace: true,
            transclude: true,
            scope: {
                tree: '=ngModel'
            }
        };
    }

    featureDirectiveFactory.$inject = ['$compile'];

    function featureDirectiveFactory($compile) {
        return {
            restrict: 'E',
            template: '<li><a href="#feature/{{feature.path | encodeURIComponent}}">{{feature.name}}</a></li>',
            link: function (scope, elm, attrs) {
                if (scope.feature.items.length > 0) {
                    elm.append($compile('<feature-tree ng-model="feature.items"></feature-tree>')(scope));
                }
            }
        };
    }

    FeatureBookController.$inject = ['$scope', '$http', '$window'];

    function FeatureBookController($scope, $http, $window) {
        $http.get('api/rest/summary').success(function (summary) {
            $scope.summary = summary;
            $window.document.title = 'Feature Book: ' + summary.title;
        });

        $http.get('api/rest/feature/tree').success(function (featuresTree) {
            $scope.featuresTree = [featuresTree];
        });
    }

    FeatureController.$inject = ['$scope', '$route'];

    function FeatureController($scope, $route) {
        $scope.feature = $route.current.locals.feature.data;
    }

    function encodeURIComponentFilter() {
        return window.encodeURIComponent;
    }

})();