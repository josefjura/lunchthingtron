/// <reference path="../typings/tsd.d.ts" />
'use strict';
window.$ = require('jquery');

module services {
	export class ZomatoScrape implements IZomatoService {

		$q: ng.IQService;
		logger: ng.ILogService;
		$http: ng.IHttpService;

		static $inject = ['$q', '$log', '$http'];
		constructor($q: ng.IQService, logger: ng.ILogService, $http: ng.IHttpService) {
			this.$q = $q;
			this.logger = logger;
			this.$http = $http;
		}

		loadMenu(rest: model.RestaurantConfig): ng.IPromise<responses.ServiceResponse> {
			var result = {};
			var deffered = this.$q.defer<responses.ServiceResponse>();

			var searchIndex = rest.url.indexOf('?');
			var dailyMenuUrl = rest.url.splice(searchIndex, 0, "/menu#daily");

			this.$http.get(dailyMenuUrl)
				.then((response) => {
					var parseRes = this.parseMenu(rest, response.data, true);
					deffered.resolve(new responses.Ok(parseRes));
				},
				(error) => {
					this.logger.log(error);					
					deffered.resolve(new responses.Error(error));
				});

			return deffered.promise;
		};

		searchAsync(searchTerm): ng.IPromise<responses.ServiceResponse> {
			var deffered = this.$q.defer<responses.ServiceResponse>();
			var url = 'https://www.zomato.com/cs/praha/restaurace?q=' + encodeURIComponent(searchTerm);
			this.$http.get<model.ScrapeSearchResponse>(url)
				.then((response) => {
					var searchRes = this.parseSearch(response.data);
					deffered.resolve(new responses.Ok(searchRes));
				},
				(error) => {
					this.logger.log(error);
					deffered.resolve(new responses.Error(error));
				});

			return deffered.promise;
		};

		private parseMenu(rest: model.RestaurantConfig, data, parseItems: boolean): model.Restaurant {
			var name = $(data).find('.res-name a span').text();
			var container = $(data).find('#daily-menu-container');
			var today = $(container).find('.tmi-group')[0];
			
			var toReturn = new model.Restaurant(rest);			

			if (today) {
				var itemselms = $(today).find('.tmi-daily');
				if (itemselms.length) {
					$.each(itemselms, (index, item) => {
						var text = $(item).find('.tmi-text-group').text().trim();
						var price = $(item).find('.tmi-price').text().trim();

						toReturn.menu.items.push(new model.MenuItem(text, price));
					});
				}
			}
			return toReturn;
		}

		private parseSearch(data): model.RestaurantConfig[] {
			var searchResults = $(data).find('a.result-title');
			var toReturn: model.RestaurantConfig[];
			for (var i in searchResults) {
				if (searchResults.hasOwnProperty(i)) {
					var element = searchResults[i];
					var name = $(element).text();
					var id = name.replace(' ', '').toLowerCase();
					var url = $(element).attr('href');
					if (name && id && url) {
						toReturn.push(new model.RestaurantConfig(name, url, id));
					}
				}
			}

			return toReturn;
		}
	}


}

angular.module('app').service('ZomatoScrape', services.ZomatoScrape);
