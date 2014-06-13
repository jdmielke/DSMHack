var app = angular.module("app", [
		"ngRoute"
	]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		controller: "IndexController",
		templateUrl: "pages/index.html"
	}).otherwise({
		redirectTo:  "/"
	});
})

.controller("IndexController", ["$scope", function($scope) {

}]);