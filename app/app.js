var _templateBase = "./pages";

angular.module("app", [
    "ngRoute",
    "ngMaterial",
    "ngAnimate",
    "ngMessages"
])
.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: _templateBase + "/index/index.html",
        controller: "indexController",
        controllerAs: "_ctrl"
    })
    .when("/settings", {
        templateUrl: _templateBase + "/settings/settings.html",
        controller: "settingsController",
        controllerAs: "_ctrl"
    });
    $routeProvider.otherwise({ redirectTo: "/" });
}
]);



//function loadData()
//{
//    var configuration = ipc.sendSync("load-config");
//    loadingProgress.loadStarted(configuration.restaurants);

//    configuration.restaurants.forEach(function (restaurant, index) {
//        $.get(restaurant.url + "/menu#daily", function (page) {
//            var container = $(page).find("#daily-menu-container");

//            var name = $(page).find(".res-name a span").text();
//            var today = $(container).find(".tmi-group")[0];

//            $(container).find(".tmi-group-name").remove();

//            //var appDataPath = app.getPath("appData");

//            var mainDiv = $("<div></div>").addClass("restaurant_" + restaurant.id);
//            var nameDiv = $("<h3></h3>").addClass("name");
//            var menuDiv = $("<div></div>").addClass("menu");

//            $(menuDiv).append(today);
//            $(nameDiv).append(name);

//            $(mainDiv).append(nameDiv);
//            $(mainDiv).append(menuDiv);

//            $("#restaurants").append(mainDiv);

//            loadingProgress.tick();
//            if (index === loadingProgress.count - 1)
//                loadingProgress.loadFinished();
//        });
//    });
//}