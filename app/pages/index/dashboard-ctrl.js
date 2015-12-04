var ipc = require('ipc');

(function () {
    "use strict";
    angular.module("app")
        .controller("DashboardCtrl", function DashboardCtrl($q, $log, $location, Zomato, UserConfig) {
            var self = this;
            self.title = getDate();

            var refresh = $location.search().refresh == "true";
            self.config = UserConfig.getRestaurantList();

            self.loadRestaurants = function (force) {
                self.restaurants = [];
                for (var i = 0; i < self.config.length; i++) {
                    var item = self.config[i];
                    Zomato.readUrlAsync(item.id, item.url)
                        .then(
                            function (result) {
                                var that = result.result;
                                that.isLoaded = true;
                                self.restaurants.push(that);
                            },
                            function (result) {
                                $log.log(result.error);
                            }
                            );
                }
            }

            self.loadRestaurants(refresh);
        });



    function getDate() {
        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + "." + monthIndex + "." + year;
    }

})();