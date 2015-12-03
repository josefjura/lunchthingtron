'use strict';
angular.module('app')
  .controller('RestaurantsListCtrl', function ($log, $scope, UserConfig) {
    var self = this;    
    $log.log('Hello from your Controller: RestaurantsCtrl in module main:. This is your controller:', this);

    this.refresh = function () {
      self.restaurants = UserConfig.getRestaurantList();
    }


    this.refresh();
    
  });
