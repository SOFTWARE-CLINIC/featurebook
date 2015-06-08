'use strict';

describe('featurebook', function () {

    var $rootScope, $route, $location;

    beforeEach(function () {
        module('scFeatureBook');
        module('scFeatureBook.templates');
        inject(function (_$rootScope_, _$route_, _$location_) {
            $rootScope = _$rootScope_;
            $route = _$route_;
            $location = _$location_;
        });
    });

    it('should configure route for /home path', function () {
        expect($route.current).toBeUndefined();

        $location.path('/home');
        $rootScope.$digest();

        expect($route.current.templateUrl).toBe('views/home.html');
    });

    it('tests for the public site JavaScript code', function () {
        expect(true).toBe(true);
    });
});