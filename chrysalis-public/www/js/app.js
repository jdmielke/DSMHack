var app = angular.module("app", [
		"ngResource",
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

.factory("ImageList", ['$resource', function($resource){
	return $resource("api/images/list", {}, {
		query: {method: "GET", isArray:true}
	});
}])

.factory("Card", function() {
	var card = {};
	return card;
})

.controller("IndexController", ["$scope", "ImageList", "Card", "$location",
	function($scope, ImageList, Card, $location) {
		$scope.imageList = ImageList.query();
		$scope.tag = "";
		$scope.tags = [
			"",
			"Anniversary",
			"Birthday"
		];
		$scope.card = Card;

		$scope.selectImage = function(image) {
			$scope.card.selectedImage = image.uuid;
			$location.path("/selectMessage");
		};
}])

.controller("SelectController", function($scope) {})
.controller("CardHoriz", function() {});