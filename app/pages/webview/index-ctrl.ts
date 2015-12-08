/// <reference path="../../typings/tsd.d.ts" />

'use strict';
angular.module('app')
  .controller('WebViewCtrl', function($log, $scope, $sce, $stateParams, $mdDialog, UserConfig) {
    var self = this;
    $log.log('Hello from your Controller: WebViewCtrl in module main:. This is your controller:', this);

    self.url = $sce.trustAsResourceUrl(decodeURIComponent($stateParams.url));

  });
