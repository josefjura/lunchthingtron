/// <reference path="../typings/tsd.d.ts" />

'use strict';

module services {
	export class ZomatoAPI implements IZomatoService {

		$q: ng.IQService;
		logger: ng.ILogService;
		$http: ng.IHttpService;

		static $inject = ['$q', '$log', '$http'];
		constructor($q: ng.IQService, logger: ng.ILogService, $http: ng.IHttpService) {
			this.$q = $q;
			this.logger = logger;
			this.$http = $http;
		}
		///TODO: Fix the inheritance !
		loadMenu(rest: model.RestaurantConfig, force: boolean): ng.IPromise<responses.ServiceResponse> {
			return new services.ZomatoScrape(this.$q, this.logger, this.$http).loadMenu(rest, force);
		};

		searchAsync(searchTerm: string): ng.IPromise<responses.ServiceResponse> {
			var deffered = this.$q.defer<responses.ServiceResponse>();
			this.$http.get<model.APISearchResponse>(
				'https://developers.zomato.com/api/v2.1/search?entity_id=84&entity_type=city&q=' + encodeURI(searchTerm), {}).
				then((response) => {
					var parsed = this.createResponse(response.data.restaurants);
					deffered.resolve(new responses.Ok(parsed));
				}, (error) => {
					deffered.resolve(new responses.Error(error));
				});

			return deffered.promise;
		};

		private createResponse(restaurants: model.RestaurantSourceEnvelope[]): model.RestaurantConfig[] {
			var rests: model.RestaurantConfig[] = new Array<model.RestaurantConfig>();

			for (var rest in restaurants) {
				if (restaurants.hasOwnProperty(rest)) {
					var element = restaurants[rest].restaurant;
					rests.push(new model.RestaurantConfig(element.name, decodeURI(element.url), element.id.toString(), element.thumb));
				}
			}

			return rests;
		}
	}


}

angular.module('app').service('ZomatoAPI', services.ZomatoAPI);
