'use strict';

angular.module('app.controllers', [])

    // URL Path: /
    .controller('HomeCtrl', ['$scope', '$window', function ($scope, $window) {
        
        $window.console.log('HomeCtrl');

        $scope.$root.appTitle = 'Application Title';
        $scope.$root.breadcrumbs = 'App | Dashboard';

        // Hardcoding data for full-widget example
        $scope.data = {
            title: "Top Flavors",
            body: [
                { rank: 1, flavor: "Vanilla"},
                { rank: 2, flavor: "Chocolate" },
                { rank: 3, flavor: "Nutmeg" },
                { rank: 4, flavor: "Rocky Road" },
                { rank: 5, flavor: "Mint Chocolate Chip" }
            ],
            footer: "Data Source: Fake Data, Inc."
        };

        $scope.$on('$viewContentLoaded', function () {
            $window.console.log('HomeCtrl Loaded...');
        });

        
    }])

    // URL Path: /reports/...
    .controller('ReportsCtrl', ['$scope', '$window', 'jsonService', function ($scope, $window, jsonService) {
        $window.console.log('ReportsCtrl');

        $scope.$root.breadcrumbs = 'App | Report';
        $scope.reportData = [];

        $scope.getData = function (reportType) {
            jsonService.getData(reportType).success(function (response) {
                $scope.reportData = response['Data'];
            });  
        };
    }])

    // URL Path: /performance/...
    .controller('PerformanceCtrl', ['$scope', '$location', '$compile', 'jsonService', function ($scope, $location, $compile, jsonService) {
        console.log('PerformanceCtrl');
        $scope.$root.breadcrumbs = 'App | Performance';


        // Example of adding dynamic content
        jsonService.getData("marketShare").success(function (response) {
            $scope.reportData = response['Data'];

            if ($location.$$url === '/performance/performanceB') {

                var tag = document.createElement('h3');
                tag.innerText = "Data being Added";

                $("#viewBody").append(tag);

                console.log('Adding data to page');
                $("#viewBody").append(prettyPrint($scope.reportData));
            }
            else {
                // Perf A page
            }
        });

    }])

    // URL Path: /error/404
    .controller('Error404Ctrl', ['$scope', '$window', function ($scope, $window) {
        console.log('Error404Ctrl');

        $scope.$root.breadcrumbs = 'App | Error';

        $scope.$on('$viewContentLoaded', function () {
            $("#navbar").find(".active").removeClass("active");
        });
    }])


