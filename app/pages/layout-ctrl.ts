/// <reference path="../typings/tsd.d.ts" />

'use strict';
module controllers {

	interface LayoutScope extends ng.IScope {
		splitViewElement: HTMLElement;
	}

	export class LayoutCtrl {

		stateService: any;


		static $inject = ['$log', '$state', '$scope'];
		constructor($log: ng.ILogService, $state, $scope: LayoutScope) {
			$scope.splitViewElement = document.getElementById("splitView");
			$log.log('Hello from your Controller: LayoutCtrl in module main:. This is your controller:', this);
			this.stateService = $state;
		};

		goToDashboard() {
			this.stateService.go('main.dashboard');
		}

		goToRestaurants() {
			this.stateService.go('main.restaurants');
		}

	}
}

angular.module('app').controller('LayoutCtrl', controllers.LayoutCtrl);