(function () {
    'use strict';

    angular.module('app')
        .value('settings', {
            restaurants: []
        });

    angular.module('app')
        .service('settingsService', ['settings', SettingsService]);

    function SettingsService(settings) {
        return {
            loadConfig: loadConfig,
            saveConfig: saveConfig,
            getConfig: getConfig
        };
    }


})();