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
	.when("/admin/messages", {
		controller: "AdminMessages",
		templateUrl: "pages/adminMessages.html"
	})
	.otherwise({
		redirectTo:  "/"
	});
})

.factory("ImageList", ['$resource', function($resource){
	return $resource("api/images", {}, {
		query: {method: "GET", isArray:true}
	});
}])

.factory("MessageList", ['$resource', function($resource){
	return $resource("api/messages", {}, {
		query: {method: "GET", isArray:true}
	});
}])

.factory("Card", function() {
	var card = {};
	return card;
})

.factory("Tags", ['$resource', function($resource){
	return $resource("api/tags", {}, {
		query: {method: "GET", isArray:true}
	});
}])

.controller("IndexController", ["$scope", "ImageList", "Card", "Tags", "$location",
	function($scope, ImageList, Card, Tags, $location) {
		$scope.imageList = ImageList.query();
		$scope.tag = "";
		$scope.tags = Tags.query();
		$scope.card = Card;

		$scope.selectImage = function(image) {
			$scope.card.image = image;
			$location.path("/selectMessage");
		};
	}]
)

.controller("SelectController", ["$scope", "Card", "MessageList", "$location",
	function($scope, Card, MessageList, $location) {
		$scope.messages = MessageList.query();
		$scope.card = Card;

		$scope.setSelectMessage = function(message) {
			$scope.card.messageText = message.text;
			$location.path("/card-horiz");
		};

		$scope.setCustomMessage = function() {
			$scope.card.messageText = $scope.custommessage;
			$location.path("/card-horiz");
		};
	}
])

.controller("CardHoriz", ["$scope", "Card",
	function($scope, Card) {
		$scope.card = Card;
	}
])

.controller("AdminMessages", ["$scope", "MessageList", "Tags",
	function($scope, MessageList, Tags) {
		$scope.tag = "";
		$scope.tags = Tags.query();
		$scope.messages = MessageList.query();
	}]
);