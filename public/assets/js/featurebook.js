'use strict';

(function () {

    angular.module('scFeatureBook', ['ngRoute', 'ngSanitize'])
        .config(config)
        .controller('FeatureBookController', FeatureBookController)
        .controller('FeatureController', FeatureController)
        .directive('featureTree', featureTreeDirectiveFactory)
        .directive('feature', featureDirectiveFactory);

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
            template: '<li>'
            + '<a ng-if="feature.type === \'file\'" href="#feature/{{feature.path | encodeURIComponent}}">{{feature.name | titleize}}</a>'
            + '<div ng-if="feature.type === \'folder\'">{{feature.name | titleize}}</div>'
            + '</li>',
            link: function featureDirectiveLinkFunction(scope, element) {
                if (scope.feature.items.length > 0) {
                    element.append($compile('<feature-tree ng-model="feature.items"></feature-tree>')(scope));
                }
            }
        };
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