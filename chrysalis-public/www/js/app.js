var app = angular.module("app", [
		"ngRoute"
	]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		controller: "IndexController",
		templateUrl: "pages/index.html"
	})
	.when("/selectMessage", {
		controller: "SelectController",
		templateUrl: "pages/selectMessage.html"
	})
	.when("/card-horiz", {
		controller: "CardHoriz",
		templateUrl: "pages/card-horiz.html"
	})
	.otherwise({
		redirectTo:  "/"
	});
})

.controller("IndexController", ["$scope", function($scope) {

}]);