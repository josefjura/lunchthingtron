'use strict';
angular.module('app')
  .controller('RestaurantsListCtrl', function ($log, $scope, Config, UserConfig) {
    var self = this;    
    $log.log('Hello from your Controller: RestaurantsCtrl in module main:. This is your controller:', this);

    this.refresh();

    this.refresh = function () {
      self.restaurants = UserConfig.getRestaurantList();
    }

  });
