'use strict';

angular.module('app.filters', [])

    .filter('versionFilter', ['version', function (version) {
        return function (text, compText) {
            var str;

            if (compText === "BETA") {
                str = String(text).replace(/VERSIONTYPE/mg, "BETA-" + version);
            }
            else {
                str = String(text).replace(/VERSIONTYPE/mg, version);
            }

            return str;
        }
    }]);