/* global $ */
window.$ = require('jquery');

'use strict';
angular.module('app')
	.service('ZomatoScrape', function ($q, $log, $http) {
		this.readUrlAsync = function (id, url) {
			var result = {};
			var deffered = $q.defer();
			$http.get(url + '/menu#daily')
				.then(function (response) {
					var parseRes = parseResponse(id, response.data, true);
					result = { success: true, result: parseRes };
					 deffered.resolve(result);
				},
					function (error) {
						$log.log(error);
						result = { success: false, error: error };
						deffered.resolve(result);
					});
					
			return deffered.promise;
		};

		this.searchAsync = function (searchTerm) {
			var deffered = $q.defer();
			var url = 'https://www.zomato.com/cs/praha/restaurace?q=' + encodeURIComponent(searchTerm);
			$http.get(url)
				.then(function (response) {
					var searchRes = parseSearch(response.data);
					deffered.resolve({ success: true, result: searchRes });					
				},
					function (error) {
						$log.log(error);
						deffered.resolve({ success: false, error: error });
					});
					
			return deffered.promise;
		};

		function parseResponse(id, data, parseItems) {
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
					$.each(itemselms, function (index, item) {
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

		function parseSearch(data) {
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
	});
