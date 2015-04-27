'use strict';

angular.module('app.directives', [])
    // IMPORTANT: camelCase naming convention is required for the directive's name due to "Angular's directive normalization" process
    .directive('appVersion', ['version', function (version) {
        return {
            restrict: 'A',
            scope: {},
            replace: true,
            template: '<span><mark><abbr title="Application Version">VER</abbr></mark>: ' + version + '</span>',
            link: function (scope, elem, attrs) {
                /*
                   scope - passed in scope of the directieve
                   elem  - jq or jqLite wraped DOM element representing directive 
                   attrs - "Angular normalized" attributes on directive
                        (e.g.  <appVersion test-Attr />  => attrs.testAttr)
                 */
                elem
                    .bind('mouseover', function () {
                        elem.css('cursor', 'pointer');
                    })
                    .bind('click', function () {  //  Adding click event to injected element
                        elem.parent().toggleClass("highlight");
                    });
            }
        };
    }])

    .directive('appFooter', ['version', function (version) {
        /* Example of nested directives:  using appVersion inside of appFooter directive */
        return {
            restrict: 'A',
            scope: {},
            replace: true,
            template: '<div class="row">' +
                            '<div class="col-lg-12">' + 
                                '<hr />  Application Footer <div app-version></div>' +
                            '</div>' +
                      '</div>'
        };
    }])


    .directive('quarterWidget', [function () {
        /* Example of directive using template URL instead of HTML string */
        /*      Using isolate scope to pass string data to template directive*/
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                title: '@',
                body: '@',
                footer: '@'
            },
            templateUrl: '/views/components/quarter_widget.html'
        };
    }])

    .directive('halfWidget', [function () {
        /* Example of directive using template URL instead of HTML string */
        /*      Using isolate scope to pass string data to template directive*/
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                title: '@',
                body: '@',
                footer: '@'
            },
            templateUrl: '/views/components/half_widget.html'
        };
    }])


    .directive('fullWidget', [function () {
        /* Using isolate scope to pass custom data object to template directive */
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                data: '='
            },
            templateUrl: '/views/components/full_widget.html'
        };
    }])

    .directive('progress', [function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            templateUrl: '/views/components/progress.html'
        };
    }])

    .directive('dynamicReport', ['$compile', '$http', function ($compile, $http) {
        /* This is the proper way to add dynamic content;  Even though it's possible, do not do so through Controller */
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,

            templateUrl: '/views/components/dynamicReport.html',
            compile: function (elem, attrs)
            {
                return {
                    pre: function (scope, elem, attrs, ctrl, transcludeFn) {
                        console.log('Pre-link');

                    },

                    post: function (scope, elem, attrs, ctrl, transcludeFn) {
                        // Manip DOM, Attach events here
                        console.log('Post-link');

                    }
                }
            }

            //link: function (scope, elem, attrs) {
            //    var e = $http.get('/views/components/dynamicReport.html').success(
            //            function (response) {
            //                return response.data;
            //            }
            //        );
            //    elem.html(e).show();

            //    $compile(elem.contents())(scope);
            //}
        };
    }]);