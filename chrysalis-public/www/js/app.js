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
	.when("/donation/:cardid", {
		controller: "Donation",
		templateUrl: "pages/donation.html"
	})
	.when("/sent", {
		templateUrl: "pages/sent.html"
	})
	.when("/admin/messages", {
		controller: "AdminMessages",
		templateUrl: "pages/adminMessages.html"
	})
	.when("/ecard/:cardid", {
		controller: "Ecard",
		templateUrl: "pages/ecard.html"
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

.factory("CardService", ['$resource', function($resource){
	return $resource("api/cards/:id", {
		id: "@cardid"
	}, {
		query: {method: "GET"}
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
		$scope.card = Card;
		$scope.card.tag = {
			name: "General Occasion"
		};
		Tags.query().$promise.then(function(tags) {
			tags.unshift($scope.card.tag);
			$scope.tags = tags;
		});

		$scope.selectImage = function(image) {
			$scope.card.image = image;
			$location.path("/selectMessage");
		};

		$scope.containsTag = function(tag) {
			return function(image) {
				var contains = false;

				if ($scope.card.tag == "" || $scope.card.tag && $scope.card.tag.name == "General Occasion") {
					return true;
				}

				angular.forEach(image.tags, function(imgtag) {
					if (imgtag.name == $scope.card.tag.name) {
						contains = true;
					}
				});
				return contains;
			};
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

.controller("CardHoriz", ["$scope", "Card", "$http", "$location",
	function($scope, Card, $http, $location) {
		$scope.card = Card;
		$scope.checked = false;

		$scope.saveCard = function() {
			$scope.checked = true;
			if ($scope.cardinfo.$valid) {
				$http.post("api/cards", $scope.card).success(function(data) {
					$location.path("/donation/" + data._id);
				});
			}
		};
	}
])

.controller("Donation", ["$scope", "$routeParams",
	function($scope, $routeParams) {
		$scope.cardid = $routeParams.cardid;
		$scope.paypal = "5VYV4XB5D3NV2";
		$scope.returnURL = "http://" + window.location.host + "/api/cards/send/" + $scope.cardid;
	}
])

.controller("Ecard", ["$scope", "$routeParams", "CardService",
	function($scope, $routeParams, CardService) {
		$scope.card = CardService.query({id: $routeParams.cardid});
	}
])

.controller("AdminMessages", ["$scope", "MessageList", "Tags",
	function($scope, MessageList, Tags) {
		$scope.tag = "";
		$scope.tags = Tags.query();
		$scope.messages = MessageList.query();
	}]
);