var _templateBase = "./pages";

angular.module("app", [
  "ngMaterial",
  "ngAnimate",
  "ui.router",
  "ngMessages",
  "utils"
])
  .config(function ($stateProvider, $urlRouterProvider) {
    
    // ROUTING with ui.router
    $urlRouterProvider.
      otherwise('/main/dashboard?refresh=false');

    $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
      .state('main', {
        url: '/main',
        templateUrl: 'pages/layout.html'
      })
      .state('main.dashboard', {
        url: '/dashboard?refresh',
        views: {
          'pageContent': {
            templateUrl: 'pages/index/dashboard.html',
            controller: 'DashboardCtrl as _ctrl'
          }
        }
      })
      .state('main.restaurants', {
        url: '/restaurants',
        views: {
          'pageContent': {
            templateUrl: 'pages/restaurants/restaurants-list.html',
            controller: 'RestaurantsListCtrl as _ctrl'
          }
        }
      });
  });