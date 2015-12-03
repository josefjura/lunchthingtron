var ipc = require('ipc');

(function () {
    "use strict";
    angular.module("app")
        .controller("DashboardCtrl", ["$q", "$location", "Zomato", "UserConfig", DashboardCtrl]);

    function DashboardCtrl($log, $location, Zomato, UserConfig) {
        var self = this;
        self.title = getDate();

        self.loadRestaurants = function (force) {
            self.restaurants = UserConfig.getRestaurantList();
        }
        
        //var config = ipc.sendSync('get-config');       
        var refresh = $location.search().refresh == "true";
        self.loadRestaurants(refresh);
    }



    function getDate() {
        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + "." + monthIndex + "." + year;
    }

})();