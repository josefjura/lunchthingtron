/// <reference path="../typings/tsd.d.ts" />
/// <reference path="zomato-scrape-serv.ts" />
'use strict';

module services {
	export class ZomatoAPI {

		$q: ng.IQService;
		logger: ng.ILogService;
		$http: ng.IHttpService;

		static $inject = ['$q', '$log', '$http'];
		constructor($q:ng.IQService, logger: ng.ILogService, $http: ng.IHttpService) {
			this.$q = $q;
			this.logger = logger;
			this.$http = $http;
		}
		///TODO: Fix the inheritance !
		readUrlAsync(id, url) {
			return new ZomatoScrape(this.$q, this.logger, this.$http).readUrlAsync(id, url);
		};

		searchAsync(searchTerm) {
			var deffered = this.$q.defer();
			this.$http.get(
				'https://developers.zomato.com/api/v2.1/search?entity_id=84&entity_type=city&q=' + encodeURI(searchTerm),
				{

				}).then((response) => {
					deffered.resolve({ success: true, result: createResponse(response.data.restaurants) });
				}, (error) => {
					deffered.resolve({ success: false, error: error });
				});

			function createResponse(restaurants) {
				var rests = [];

				for (var rest in restaurants) {
					if (restaurants.hasOwnProperty(rest)) {
						var element = restaurants[rest].restaurant;
						rests.push({ name: element.name, url: decodeURI(element.url), id: element.id, avatar: element.thumb });
					}
				}

				return rests;
			}

			return deffered.promise;
		};
	}


}

angular.module('app').service('ZomatoAPI', services.ZomatoAPI);
