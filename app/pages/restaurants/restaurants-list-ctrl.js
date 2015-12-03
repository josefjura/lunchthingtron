'use strict';
angular.module('app')
  .controller('RestaurantsListCtrl', function ($log, $scope, $mdDialog, UserConfig) {
    var self = this;
    $log.log('Hello from your Controller: RestaurantsCtrl in module main:. This is your controller:', this);

    this.refresh = function () {
      self.restaurants = UserConfig.getRestaurantList();
    }

    this.openAdd = function (event) {
      $mdDialog.show({
        controller: 'RestaurantsAddCtrl as _ctrl',
        templateUrl: './pages/restaurants/restaurants-add.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        autoWrap: true
      })
        .then(function (answer) {
          
        }, function () {

        });
    }


    this.refresh();

  });
