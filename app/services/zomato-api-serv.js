/* global $ */
window.$ = require('jquery');

'use strict';
angular.module('app')
	.service('ZomatoAPI', function ($q, $log, $http, ZomatoScrape) {
		this.readUrlAsync = function (id, url) {
			return ZomatoScrape.readUrlAsync(id, url);
		};

		this.searchAsync = function (searchTerm) {
			
		};
	});
