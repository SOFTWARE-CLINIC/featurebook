(function () {
  'use strict';

  angular.module('scFeatureBook')
    .config(routesConfig);

  routesConfig.$inject = ['$routeProvider'];

  function routesConfig($routeProvider) {
    $routeProvider
      .when('/viewer/:path*', {
        templateUrl: 'views/feature-viewer.html',
        controller: 'FeatureViewerController',
        resolve: {
          feature: featureResolver
        }
      })
      .when('/summary/:path*?', {
        templateUrl: 'views/summary.html',
        controller: 'SummaryController',
        resolve: {
          summary: summaryResolver
        }
      })
      .otherwise({
        redirectTo: '/summary/'
      });

    featureResolver.$inject = ['$route', 'featureBookService'];

    function featureResolver($route, featureBookService) {
      return featureBookService.getFeature($route.current.pathParams.path);
    }

    summaryResolver.$inject = ['$route', 'featureBookService'];

    function summaryResolver($route, featureBookService) {
      return featureBookService.getSummary($route.current.pathParams.path);
    }
  }

})();
