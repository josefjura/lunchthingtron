'use strict';
angular.module('app')
	.controller('RestaurantsAddCtrl', function ($log, $mdDialog, UserConfig, Zomato) {
		var self = this;
		this.searchTerm = '';
		this.results = [];
		this.isSearching = false;
		$log.log('Hello from your Controller: RestaurantsAddCtrl in module main:. This is your controller:', this);

		this.search = function () {
			this.isSearching = true;
			Zomato.searchAsync(self.searchTerm)
				.then(function (response) {
					self.isSearching = false;
					if (response.success) {
						self.results = markExisting(response.result);
						self.searchTerm = '';
					}
					else {
						$log.log(response.error);
					}
				},
					function (response) {
						$log.log(response.error);
					});
		};

		this.hide = function () {
			$mdDialog.hide();
		}

		this.stateChange = function (rest) {
			if (rest.added) {
				UserConfig.addRestaurant(rest);
			}
			else {
				UserConfig.removeRestaurant(rest);
			}
		}

		this.add = function (item) {
			if (!item.added) {
				UserConfig.addRestaurant(item);
				item.added = true;
			}
		};

		this.remove = function (item) {
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
