(function () {
    "use strict";
    var ipc = require('ipc');


    angular.module("app")
        .controller("settingsController", ["$q", "$mdDialog", "$location", SettingsCtrl]);

    function SettingsCtrl($q, $mdDialog, $location) {
        var self = this;

        self.config = ipc.sendSync("get-config");


        self.saveSettings = function () {
            $location.search('refresh', false).path("/");
        }        
    }

})();