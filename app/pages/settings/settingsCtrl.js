(function () {
    "use strict";
    angular.module("app")
        .controller("settingsController", ["$q", "$mdDialog", "$location", SettingsCtrl]);

    function SettingsCtrl($q, $mdDialog, $location) {
        var self = this;

        self.saveSettings = function () {
            $location.search('refresh', false).path("/");
        }
    }

})();