'use strict';

describe('FeatureBookController', function () {

    var $window,
        featureBookService,
        $q,
        $scope,
        $controller;

    beforeEach(function () {
        module('scFeatureBook');

        inject(function ($rootScope, _$window_, _$controller_, _featureBookService_, _$q_) {
            $scope = $rootScope.$new();
            $window = _$window_;
            $controller = _$controller_;
            featureBookService = _featureBookService_;
            $q = _$q_;
        });
    });

    describe('#$activate', function () {

        it('should fetch metadata', function () {
            // given
            var metadata = {'title': 'My Sample Specification', 'version': '1.0'};
            // and
            spyOn(featureBookService, 'metadata').and.returnValue($q.when(metadata));
            spyOn(featureBookService, 'findAll').and.returnValue($q.when({}));

            // when
            $controller('FeatureBookController', {$scope: $scope});
            $scope.$digest();

            // then
            expect($scope.metadata).toEqual(metadata);
        });

        it('should fetch featuresTree', function () {
            // given
            var featuresTree = {
                'path': '.',
                'name': 'my_specification',
                'type': 'folder',
                'items': []
            };
            // and
            spyOn(featureBookService, 'findAll').and.returnValue($q.when(featuresTree));
            spyOn(featureBookService, 'metadata').and.returnValue($q.when({}));

            // when
            $controller('FeatureBookController', {$scope: $scope});
            $scope.$digest();

            // then
            expect($scope.featuresTree).toEqual(featuresTree);
        });

        it('should set document title and version', function () {
            // given
            var metadata = {'title': 'My Sample Specification', 'version': '1.0'};
            // and
            spyOn(featureBookService, 'metadata').and.returnValue($q.when(metadata));
            spyOn(featureBookService, 'findAll').and.returnValue($q.when({}));

            // when
            $controller('FeatureBookController', {$scope: $scope});
            $scope.$digest();

            // then
            expect($window.document.title).toEqual('My Sample Specification 1.0');
        });

        it('should set document title without version', function () {
            // given
            var metadata = {'title': 'My Sample Specification'};
            // and
            spyOn(featureBookService, 'metadata').and.returnValue($q.when(metadata));
            spyOn(featureBookService, 'findAll').and.returnValue($q.when({}));

            // when
            $controller('FeatureBookController', {$scope: $scope});
            $scope.$digest();

            // then
            expect($window.document.title).toEqual('My Sample Specification');
        });

    });

});