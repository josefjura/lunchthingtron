'use strict';
angular.module('app')
	.controller('RestaurantsNewCtrl', function ($log, UserConfig, Zomato) {
		var self = this;
		self.searchTerm = '';
		self.results = [];
		$log.log('Hello from your Controller: RestaurantNewCtrl in module main:. This is your controller:', this);

		self.search = function () {
			Zomato.searchAsync(self.searchTerm, function (response) {
				if (response.success) {
					self.results = markExisting(response.result);
					self.searchTerm = '';
				}
				else {
					$log.log(response.error);
				}
			});

		};

		self.add = function (item) {
			if (!item.added) {
				UserConfig.addRestaurant(item);
				item.added = true;
			}
		};

		self.remove = function (item) {
			UserConfig.removeRestaurant(item);
			item.added = false;
		};

		function markExisting(results) {
			var rests = UserConfig.getRestaurantList();
			for (var i in results) {
				if (results.hasOwnProperty(i)) {
					for (var ii in rests) {
						if (rests.hasOwnProperty(ii)) {
							results[i].added = results[i].url === rests[ii].url;
						}
					}
				}
			}

			return results;
		}
	});
