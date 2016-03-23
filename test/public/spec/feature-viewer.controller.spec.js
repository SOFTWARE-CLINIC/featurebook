'use strict';

describe('FeatureViewerController', function () {

  var $rootScope;
  var $controller;
  var $route;

  beforeEach(function () {
    angular.mock.module('scFeatureBook');
    angular.mock.inject(function (_$rootScope_, _$controller_, _$route_) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $route = _$route_;
    });
  });

  describe('#activate', function () {
    it('should save route resolve', function () {
      // given
      var $scope = $rootScope.$new();
      // and
      $route.current = {
        locals: {
          feature: {
            status: 'success',
            data: {
              keyword: 'Feature'
            }
          }
        }
      };

      // when
      $controller('FeatureViewerController', {$scope: $scope});
      $scope.$digest();

      // then
      expect($scope.featureResponse).toEqual({
        status: 'success',
        data: {
          keyword: 'Feature'
        }
      });
    });
  });

  describe('#hasError', function () {
    it('should return `true` when route resolve response status is `success`', function () {
      // given
      var $scope = $rootScope.$new();
      // and
      $route.current = {
        locals: {
          feature: {
            status: 'success',
            data: {
              keyword: 'Feature'
            }
          }
        }
      };

      // when
      $controller('FeatureViewerController', {$scope: $scope});
      $scope.$digest();

      // then
      expect($scope.hasError()).toBe(false);
    });

    it('should return `false` when route resolve status is `error`', function () {
      // given
      var $scope = $rootScope.$new();
      // and
      $route.current = {
        locals: {
          feature: {
            status: 'error'
          }
        }
      };

      // when
      $controller('FeatureViewerController', {$scope: $scope});
      $scope.$digest();

      // then
      expect($scope.hasError()).toBe(true);
    });
  });

});
