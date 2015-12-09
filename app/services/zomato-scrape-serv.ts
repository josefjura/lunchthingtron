/// <reference path="../typings/tsd.d.ts" />
'use strict';
window.$ = require('jquery');

module services {
	export class ZomatoScrape {

		$q: ng.IQService;
		logger: ng.ILogService;
		$http: ng.IHttpService;

		static $inject = ['$q', '$log', '$http'];
		constructor($q: ng.IQService, logger: ng.ILogService, $http: ng.IHttpService) {
			this.$q = $q;
			this.logger = logger;
			this.$http = $http;
		}

		readUrlAsync(id, url) {
			var result = {};
			var deffered = this.$q.defer();

			var searchIndex = url.indexOf('?');
			var dailyMenuUrl = url.splice(searchIndex, 0, "/menu#daily");

			this.$http.get(dailyMenuUrl)
				.then((response) => {
					var parseRes = this.parseResponse(id, response.data, true);
					result = { success: true, result: parseRes };
					deffered.resolve(result);
				},
				(error) => {
					this.logger.log(error);
					result = { success: false, error: error };
					deffered.resolve(result);
				});

			return deffered.promise;
		};

		searchAsync(searchTerm) {
			var deffered = this.$q.defer();
			var url = 'https://www.zomato.com/cs/praha/restaurace?q=' + encodeURIComponent(searchTerm);
			this.$http.get(url)
				.then((response) => {
					var searchRes = this.parseSearch(response.data);
					deffered.resolve({ success: true, result: searchRes });
				},
				(error) => {
					this.logger.log(error);
					deffered.resolve({ success: false, error: error });
				});

			return deffered.promise;
		};

		private parseResponse(id, data, parseItems) {
			if (parseItems === undefined || parseItems === null) {
				parseItems = false;
			}
			var items = [];
			var name = $(data).find('.res-name a span').text();
			var container = $(data).find('#daily-menu-container');
			var today = $(container).find('.tmi-group')[0];

			if (today && parseItems) {
				var itemselms = $(today).find('.tmi-daily');
				if (itemselms.length) {
					$.each(itemselms, (index, item) => {
						var text = $(item).find('.tmi-text-group').text().trim();
						var price = $(item).find('.tmi-price').text().trim();

						items.push({
							text: text,
							price: price
						});
					});
				}
			}

			return { id: id, name: name, menu: items };
		}

		private parseSearch(data) {
			var searchResults = $(data).find('a.result-title');
			var toReturn = [];
			for (var i in searchResults) {
				if (searchResults.hasOwnProperty(i)) {
					var element = searchResults[i];
					var name = $(element).text();
					var id = name.replace(' ', '').toLowerCase();
					var url = $(element).attr('href');
					if (name && id && url) {
						toReturn.push({ id: id, name: name, url: url });
					}
				}
			}

			return toReturn;
		}
	}


}

angular.module('app').service('ZomatoScrape', services.ZomatoScrape);
