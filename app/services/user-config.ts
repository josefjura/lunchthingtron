/// <reference path="../typings/tsd.d.ts" />

'use strict';

module services {

  export class UserConfig {

    logger: ng.ILogService;
    storage: services.Storage;

    static $inject = ['$log', 'Storage'];
    constructor(log: ng.ILogService, storage: services.Storage) {
      this.logger = log;
      this.storage = storage;
    }

    getRestaurantList(): model.RestaurantConfig[] {
      var config = this.storage.getObject('config');
      if (config.restaurants) {
        this.logger.log('Loaded configuration. Length: ' + config.restaurants.length);
      }
      else {
        this.logger.log('Creating new configuration');
        config.restaurants = new Array<model.RestaurantConfig>();
        this.storage.setObject('config', config);
      }
      return config.restaurants;
    };

    setRestaurantList(restaurants: model.RestaurantConfig[]): model.RestaurantConfig[] {
      var config = this.storage.getObject('config');
      if (restaurants !== null) {
        config.restaurants = restaurants;
        this.storage.setObject('config', config);
      }
      return config.restaurants;
    };

    addRestaurant(restaurant: model.RestaurantConfig): void {
      var list = this.getRestaurantList();
      list.push(restaurant);
      this.setRestaurantList(list);
    };

    removeRestaurant(restaurant: model.RestaurantConfig): void {
      var list = this.getRestaurantList();
      var index = list.indexOf(restaurant);
      list.splice(index, 1);
      this.setRestaurantList(list);
    };
  }

  angular.module('app').service('UserConfig', services.UserConfig);
}