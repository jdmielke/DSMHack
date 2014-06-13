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
	.otherwise({
		redirectTo:  "/"
	});
})

.controller("IndexController", ["$scope", function($scope) {

}]);