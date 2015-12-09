/// <reference path="../../typings/tsd.d.ts" />
'use strict';

module controllers {
  export class WebViewCtrl {
    url: string;

    static $inject = ['$log', '$scope', '$sce', '$stateParams'];
    constructor($log: ng.ILogService, $scope: ng.IScope, $sce, $stateParams) {
      this.url = $sce.trustAsResourceUrl(decodeURIComponent($stateParams.url));
    }
  }

  angular.module('app').controller('WebViewCtrl', controllers.WebViewCtrl);
}
