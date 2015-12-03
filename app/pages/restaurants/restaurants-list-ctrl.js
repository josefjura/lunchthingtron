(function () {
    "use strict";

    var ipc = require("ipc");

    angular.module("app")
        .controller("RestaurantsListCtrl", ["$q", "$mdDialog", "$location", RestaurantsListCtrl])
        .config(function ($mdThemingProvider) {
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
              .primaryPalette('yellow')
              .dark();
        });

    function RestaurantsListCtrl($q, $mdDialog, $location) {
        var self = this;
		
    }

})();