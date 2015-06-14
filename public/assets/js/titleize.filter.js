'use strict';

(function () {

    angular.module('scFeatureBook')
        .filter('titleize', titleizeFilter);

    function titleizeFilter() {
        return function (input) {
            // FIXME https://github.com/SOFTWARE-CLINIC/featurebook/issues/12
            return input + ' XXX';
        }
    }

})();
