'use strict';

// Loads all dependencies
angular.module('app', ['ui.router', 'app.filters', 'app.services', 'app.directives', 'app.controllers'])

    // Configuration point for registering Angular services, constants and providers to the application
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

        
        /*-----------------------------------*\
            Angular Expression Syntax
        \*-----------------------------------*/
        /* Uncomment below lines if you want to change Angular expression syntax to avoid conflicts with other JavaScript libraries */
        //$interpolateProvider.startSymbol('[[');
        //$interpolateProvider.endSymbol(']]');

        /*-----------------------------------*\
            URL Routing and Mapping below 
        \*-----------------------------------*/

        // For any unmatched url, send to /error
        //$urlRouterProvider.otherwise("/error")

        $stateProvider
            .state('Home', {
                url: '/',
                templateUrl: '/views/dashboard.html',  // Setting home page to be the dashboard
                controller: 'HomeCtrl'
            })
            .state('performanceA', {
                url: '/performance/performanceA',
                templateUrl: '/views/performanceA.html',
                controller: 'PerformanceCtrl'
            })
            .state('performanceB', {
                url: '/performance/performanceB',
                templateUrl: '/views/performanceB.html',
                controller: 'PerformanceCtrl'
            })
            .state('reportA', {
                url: '/reports/reportA',
                templateUrl: '/views/reportA.html',
                controller: 'ReportsCtrl'
            })
            .state('reportB', {
                url: '/reports/reportB',
                templateUrl: '/views/reportB.html',
                controller: 'ReportsCtrl'
            })
            .state('otherwise', {
                url: '*path',
                templateUrl: 'views/404.html',
                controller: 'Error404Ctrl'  // Don't have to specify a Controller if you just want to display a static page
            });

        /* Have routing rely on HTML5's History.pushState API if supported by browser */
        $locationProvider.html5Mode({
            enabled: true
        });

    }])

// Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
    // can be injected here. This is to prevent further system configuration during application run time.
    .run(['$templateCache', '$rootScope', '$state', '$stateParams', function ($templateCache, $rootScope, $state, $stateParams) {

        // <ui-view> contains a pre-rendered template for the current view
        // caching it will prevent a round-trip to a server at the first page load
        //var view = angular.element('#ui-view');
        //$templateCache.put(view.data('tmpl-url'), view.html());

        // Allows to retrieve UI Router state information from inside templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {

            // Sets the layout name, which can be used to display different layouts (header, footer etc.)
            // based on which page the user is located
            $rootScope.layout = toState.layout;
        });

    }]);