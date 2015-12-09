/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../services/user-config.ts" />
/// <reference path="../../services/zomato-api-serv.ts" />

module controllers {
    export class DashboardCtrl {
        title: string;
        config: Array<any>;
        restaurants: Array<any>;
        zomato: services.ZomatoAPI;
        logger: ng.ILogService;

        static $inject = ['$q', '$log', 'ZomatoAPI', 'UserConfig'];
        constructor($q: ng.IQService, $log: ng.ILogService, ZomatoAPI: services.ZomatoAPI, UserConfig: services.UserConfig) {
            this.title = this.getDate();
            this.config = UserConfig.getRestaurantList();
            this.logger = $log;
            this.zomato = ZomatoAPI;
            this.loadRestaurants();
        }

        loadRestaurants() {
            this.restaurants = [];
            for (var i = 0; i < this.config.length; i++) {
                var item = this.config[i];
                this.zomato.readUrlAsync(item.id, item.url)
                    .then(
                    (result) => {
                        var that = result.result;
                        that.isLoaded = true;
                        this.restaurants.push(that);
                    },
                    (result) => {
                        this.logger.log(result.error);
                    }
                    );
            }
        };

        //TODO: Move to utility class
        private getDate() {
            var date = new Date();
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + "." + monthIndex + "." + year;
        };

    }

    angular.module('app').controller('DashboardCtrl', controllers.DashboardCtrl);
}