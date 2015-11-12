(function () {
    'use strict';

    angular.module('app')
        .service('zomatoService', ['$q', '$http', '$cacheFactory', ZomatoService]);

    function ZomatoService($q, $http, $cacheFactory) {
        var cache = $cacheFactory('LunchThingtronCache');

        return {
            getRestaurants: getRestaurants
        };

        function getRestaurants(configuration, force) {            
            this.force = force === true;            
            var key = "MENU_DATA";
            var results = cache.get(key);
            if (!results || force) {
                results = [];
                configuration.restaurants.forEach(function (restaurant, index) {
                    var handleError = function (response) {
                        var result = new RestaurantError(restaurant.id);
                        result.parse(response);
                        results.push(result);
                    };

                    $http.get(restaurant.url + "/menu#daily")
                        .then(function (response) {
                            var result = new RestaurantData(restaurant.id, restaurant.name);
                            result.parse(response.data);
                            results.push(result);
                        },
                            handleError);
                });

                cache.put(key, results);
            }
            return results;
        }
    }
})();