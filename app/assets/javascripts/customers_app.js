var app = angular.module('customers', [ 'ngRoute', 'templates' ]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/", {
		controller: "CustomerSearchController",
		templateUrl: "customer_search.html"
	}).when("/:id", {
		controller: "CustomerDetailController",
		templateUrl: "customer_detail.html"
		});
	}
]);

	// var CustomerSearchController = function($scope) {
// 	$scope.search = function(searchTerm) {
// 		$scope.searchedFor = searchTerm;
// 	}
// }

// app.controller("CustomerSearchController", ["$scope", CustomerSearchController]);

// app.controller("CustomerSearchController", ["$scope", "$http", function($scope, $http) {
// // // 	// $scope.customers = []; <-- This line is just to show that the array sent to the browser initially before the search is an empty array. It can be ignored
	
// // // // 	$scope.search = function(searchTerm) {
// // // // 	// used this to test the angular app initially.
// // // // 	// $scope.customers = [
// // // // 	// {
// // // // 	// 	"first_name":"Schuyler",
// // // // 	// 	"last_name":"Cremin",
// // // // 	// 	"email":"giles0@macgyver.net",
// // // // 	// 	"username":"jillian0",
// // // // 	// 	"created":"2015-03-04"
// // // // 	// },
// // // // 	// {
// // // // 	// 	"first_name":"Derick",
// // // // 	// 	"last_name":"Ebert",
// // // // 	// 	"email":"lupel@rennerfisher.org",
// // // // 	// 	"username":"ubaldo_kaulkel",
// // // // 	// 	"created":"2015-03-04"
// // // // 	// },
// // // // 	// {
// // // // 	// 	"first_name":"Kenny",
// // // // 	// 	"last_name":"Black",
// // // // 	// 	"email":"kenny0@black.com",
// // // // 	// 	"username":"kennyblack",
// // // // 	// 	"created":"2015-03-04"
// // // // 	// }
// // // // 	// ]
// // // // 	// The Ajax request using $http

	
// // // // }

// $scope.search = function(searchTerm) {
// 		$http.get("/customers.json", {"params": {"keywords": searchTerm} }).then(function(response) {
// 			$scope.customers = response.data;
// 		}, function(response) {
// 			alert("There was a problem: " + response)
// 		}
// 		);
// 	}
// }
// ]);


app.controller("CustomerSearchController", ["$scope", "$http", "$location",
	function ($scope, $http, $location) {

		var page = 0;

		$scope.customers = [];
		$scope.search = function (searchTerm) {
			$scope.searchedFor = searchTerm;

			if (searchTerm.length < 3) {
				return;
			}

			$http.get("/customers.json", { "params": {"keywords": searchTerm, "page": page } }
				).then(function(response) {
					$scope.customers = response.data
				}, function (response) {
					alert("There was a problem " + response.status);
				}
				);
		},

		$scope.previousPage = function () {
			if (page > 0) {
				page = page -1;
				$scope.search($scope.keywords);
			}
		},

		$scope.nextPage = function () {
				page +=1
				$scope.search($scope.keywords);
		},

		$scope.viewDetails = function(customer) {
			$location.path('/' + customer.id);
		}

	}]);

app.controller("CustomerDetailController", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
	var customerId = $routeParams.id;
	$scope.customer = {};

	$http.get("/customers/" + customerId + ".json").then(function(response) {
		$scope.customer = response.data;
	}, function(response) {
		alert("There was a problem: " + response.status);
	}
	);
	} 
] );