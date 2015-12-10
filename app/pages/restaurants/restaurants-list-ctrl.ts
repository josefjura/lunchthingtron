/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../services/user-config.ts" />
'use strict';
module controllers {

  export class RestaurantsListCtrl {
    dialogService: ng.material.IDialogService;
    userConfig: services.UserConfig;
    stateService: any;
    restaurants: any;
    changed: boolean;

    static $inject = ['$log', '$state', '$scope', '$mdDialog', 'UserConfig'];
    constructor($log: ng.ILogService, $state, $scope: ng.IScope, $mdDialog: ng.material.IDialogService, UserConfig: services.UserConfig) {
      var self = this;
      $log.log('Hello from your Controller: RestaurantsCtrl in module main:. This is your controller:', this);
      this.dialogService = $mdDialog;
      this.userConfig = UserConfig;
      this.stateService = $state;
      this.changed = false;
      this.refresh();
    };

    refresh() {
      this.restaurants = this.userConfig.getRestaurantList();
    };

    backToDashboard() {
      this.stateService.go('main.dashboard', { refresh: this.changed });
    }

    openAdd(event) {
      this.dialogService.show({
        controller: 'RestaurantsAddCtrl as _ctrl',
        templateUrl: './pages/restaurants/restaurants-add.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true
      }).then(() => {
        this.refresh();
      });
    };

    removeRestaurant(rest) {
      this.changed = true;
      var ind = this.restaurants.indexOf(rest);
      if (ind > -1) {
        this.restaurants.splice(ind, 1);
        this.userConfig.removeRestaurant(rest);
      }
    };

    openRestaurant(rest) {
      this.stateService.go('main.webview', { url: rest.url });
    };
  }
}

angular.module('app').controller('RestaurantsListCtrl', controllers.RestaurantsListCtrl);