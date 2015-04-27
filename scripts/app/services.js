'use strict';


angular.module('app.services', [])
    .value('version', '0.1')  // Injected into Controllers and Services only


    .constant('company', 'CompanyName')  // Injected into Module Config function; value cannot be changed


    .service('appValues', [ 'version', function (version) {   //  For passing simple data between Controllers
        this.title = 'Demo ' + version;                       //   returns a Constructor
    }])

    //  Similar to Service above, but returns anything that you want
    .factory('jsonService',  ['$http', function ($http) {    

        return {
            getData: function (fileName) {
                var url = ['data/', fileName, '.json'].join('');
                
                return $http.get(url);
            }
        };

    }]);