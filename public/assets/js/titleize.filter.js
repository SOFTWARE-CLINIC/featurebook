'use strict';

(function () {

    angular.module('scFeatureBook')
        .filter('titleize', titleizeFilter);

    function titleizeFilter() {
        return function (input) {
            var withoutUnderscores = input.replace(/_/g, ' ');
            var uppercased = withoutUnderscores.charAt(0).toUpperCase() + withoutUnderscores.slice(1);
            var withoutFeature = uppercased.replace(/.feature/g, '');
            return withoutFeature;
        }
    }

})();
