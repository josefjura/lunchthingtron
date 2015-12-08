/* global $ */
window.$ = require('jquery');

'use strict';
angular.module('app')
	.service('ZomatoAPI', function ($q, $log, $http, ZomatoScrape) {
		this.readUrlAsync = function (id, url) {
			return ZomatoScrape.readUrlAsync(id, url);
		};

		this.searchAsync = function (searchTerm) {					
			var deffered = $q.defer();
			$http.get(
				'https://developers.zomato.com/api/v2.1/search?entity_id=84&entity_type=city&q=' + encodeURI(searchTerm),
				{

				}).then(function (response) {
					deffered.resolve({ success: true, result: createResponse(response.data.restaurants) });
				}, function (error) {
					deffered.resolve({ success: false, error: error });
				});

				function createResponse(restaurants){
					var rests = [];
					
					for (var rest in restaurants) {
						if (restaurants.hasOwnProperty(rest)) {
							var element = restaurants[rest].restaurant;
							rests.push({name:element.name, url: decodeURI(element.url), id: element.id, avatar: element.thumb});
						}
					}
					
					return rests;
				}

			return deffered.promise;
		};

	});
