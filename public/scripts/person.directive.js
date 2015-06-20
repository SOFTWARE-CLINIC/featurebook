'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .directive('person', personDirectiveFactory);

    function personDirectiveFactory() {
        return {
            restrict: 'E',
            templateUrl: 'views/person.html',
            replace: true,
            scope: {
                person: '=ngModel'
            }
        };
    }

})();