(function () {
    "use strict";

    var ipc = require("ipc");

    angular.module("app")
        .controller("RestaurantsAddCtrl", ["$q", "$mdDialog", "$location", RestaurantsAddCtrl])
        .config(function ($mdThemingProvider) {
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
              .primaryPalette('yellow')
              .dark();
        });

    function RestaurantsAddCtrl($q, $mdDialog, $location) {
        var self = this;
		
    }

})();