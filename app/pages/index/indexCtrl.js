var ipc = require('ipc');

(function () {
    "use strict";
    angular.module("app")
        .controller("indexController", ["$q", "$mdDialog", "$location", "zomatoService", IndexCtrl]);

    function IndexCtrl($q, $mdDialog, $location, zomatoService) {
        var self = this;
        self.title = getDate();

        //var config = "{\"restaurants\":[{\"id\":\"petersburger\",\"name\":\"Peters Burger Pub\",\"url\":\"https://www.zomato.com/cs/praha/peters-burger-pub-karl%C3%ADn-praha-8\"},{\"id\":\"andel\",\"name\":\"Karlínský andel\",\"url\":\"https://www.zomato.com/cs/praha/karl%C3%ADnsk%C3%BD-and%C4%9Bl-karl%C3%ADn-praha-8\"},{\"id\":\"uzabranskych\",\"name\":\"U Zábranských\",\"url\":\"https://www.zomato.com/cs/praha/u-z%C3%A1bransk%C3%BDch-karl%C3%ADn-praha-8\"},{\"id\":\"usani\",\"name\":\"U Saní\",\"url\":\"https://www.zomato.com/cs/praha/u-san%C3%AD-karl%C3%ADn-praha-8\"},{\"id\":\"panonia\",\"name\":\"Panonia\",\"url\":\"https://www.zomato.com/cs/praha/panonia-karl%C3%ADn-praha-8\"},{\"id\":\"utunelu\",\"name\":\"U Tunelu\",\"url\":\"https://www.zomato.com/cs/praha/u-tunelu-1-karl%C3%ADn-praha-8\"},{\"id\":\"upristavu\",\"name\":\"U Karlínského prístavu\",\"url\":\"https://www.zomato.com/cs/praha/u-karl%C3%ADnsk%C3%A9ho-p%C5%99%C3%ADstavu-karl%C3%ADn-praha-8\"}]}";
        var config = ipc.sendSync('load-config');
        //config = JSON.parse(config);        
        self.restaurants = zomatoService.getRestaurants(config, $location.search().refresh);
        self.openSettings = function () {
            $location.path("/settings");
        };
        self.refresh = function () {
            $location.search('refresh', true).path("/");
        };
    }



    function getDate() {
        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + "." + monthIndex + "." + year;
    }

})();