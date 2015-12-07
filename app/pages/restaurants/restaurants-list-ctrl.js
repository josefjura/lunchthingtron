'use strict';
angular.module('app')
  .controller('RestaurantsListCtrl', function ($log, $state, $scope, $mdDialog, UserConfig) {
    var self = this;
    $log.log('Hello from your Controller: RestaurantsCtrl in module main:. This is your controller:', this);

    self.refresh = function () {
      self.restaurants = UserConfig.getRestaurantList();
    }

    self.openAdd = function (event) {
      $mdDialog.show({
        controller: 'RestaurantsAddCtrl as _ctrl',
        templateUrl: './pages/restaurants/restaurants-add.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        autoWrap: true
      }).then(function () {
        self.refresh();
      });
    }

    self.removeRestaurant = function (rest) {
      var ind = self.restaurants.indexOf(rest);
      if (ind > -1) {
        self.restaurants.splice(ind, 1);
        UserConfig.removeRestaurant(rest);
      }
    }

    self.openRestaurant = function (rest) {
      $state.go('main.webview', {url: rest.url});
    }

    self.refresh();

  });
