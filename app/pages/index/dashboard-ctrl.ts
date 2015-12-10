/// <reference path="../../typings/tsd.d.ts" />

module controllers {
    export class DashboardCtrl {
        title: string;
        config: model.RestaurantConfig[];
        restaurants: model.Restaurant[] = new Array<model.Restaurant>();
        zomato: services.IZomatoService;
        logger: ng.ILogService;

        static $inject = ['$q', '$log', '$stateParams', 'ZomatoAPI', 'UserConfig'];
        constructor($q: ng.IQService, $log: ng.ILogService, $stateParams, ZomatoAPI: services.IZomatoService, UserConfig: services.UserConfig) {
            this.title = this.getDate();
            this.config = UserConfig.getRestaurantList();
            this.logger = $log;
            this.zomato = ZomatoAPI;

            var refresh = $stateParams.refresh === 'true';
            $log.log("Refresh: " + refresh);

            this.loadRestaurants(refresh);
        }

        loadRestaurants(force: boolean): void {
            var desynced = this.restaurants.length != this.config.length;
            var emptyData = this.restaurants == null;
            if (!force && !emptyData && !desynced) return;

            if (force == true)
                this.logger.log("Forced reload");
            else if (emptyData)
                this.logger.log("Empty source data, reloading.");
            else if (desynced)
                this.logger.log("Desynced data, reloading cached");


            this.restaurants = new Array<model.Restaurant>();
            for (var i = 0; i < this.config.length; i++) {
                var item = this.config[i];
                var restaurant: model.Restaurant;
                this.zomato.loadMenu(item, force).
                    then((result) => {
                        result.data.loaded = true;
                        result.data.success = result.success && (result.data.menu.items.length > 0);

                        this.restaurants.push(result.data);
                    },
                    (error) => {
                        var result = new model.Restaurant(item);
                        result.loaded = true;
                        result.success = false;
                        this.restaurants.push(result);
                        this.logger.log("loadRestaurants: " + error);
                    });
            }
        };

        //TODO: Move to utility class
        private getDate(): string {
            var date = new Date();
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + "." + monthIndex + "." + year;
        };

    }

    angular.module('app').controller('DashboardCtrl', controllers.DashboardCtrl);
}