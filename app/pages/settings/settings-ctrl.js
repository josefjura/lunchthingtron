(function () {
    "use strict";

    var ipc = require("ipc");

    angular.module("app")
        .controller("SettingsCtrl", ["$q", "$mdDialog", "$location", SettingsCtrl])
        .config(function ($mdThemingProvider) {
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
              .primaryPalette('yellow')
              .dark();
        });

    function SettingsCtrl($q, $mdDialog, $location) {
        var self = this;

        self.config = ipc.sendSync("get-config");
        self.newRest = {
            id: "",
            name: "",
            url: ""
        }

        self.saveSettings = function () {
            console.log("Saving settings .. ");
            ipc.sendSync("set-config", self.config);
            $location.search("refresh", false).path("/");
            console.log("Settings saved");
        }

        self.delete = function (item) {
            var index = self.config.restaurants.indexOf(item);
            self.config.restaurants.splice(index, 1);
        }

        self.addRestaurant = function (form) {
            if (form.$valid) {
                self.config.restaurants.push({
                    id: self.newRest.id,
                    name: self.newRest.name,
                    url: self.newRest.url
                });

                self.newRest.id = "";
                self.newRest.name = "";
                self.newRest.url = "";                
                form.$setUntouched();
            }
        }
    }

})();