'use strict';

(function () {

    angular.module('scFeatureBook')
        .filter('titleize', titleizeFilter);

    function titleizeFilter() {
        return function (input) {
            // FIXME https://github.com/SOFTWARE-CLINIC/featurebook/issues/12
            //input.replace(/_/g," ")
            //input.charAt(0).toUpperCase() + input.slice(1)
            var withoutUnderscores = input.replace(/_/g, ' ');
            var afterUpper = withoutUnderscores.charAt(0).toUpperCase() + withoutUnderscores.slice(1)
            var withoutFeature = afterUpper.replace(/.feature/g,"")
            return withoutFeature;
        }
    }

})();
