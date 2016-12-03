app.controller("CustomerSearchController", [
			'$scope', '$http', function($scope, $http) {
				module("customers");
				inject(function($controller, $rootScope) {
					var scope = $rootScope.$new();
				var controller = $controller("CustomerSearchController", { "$scope": scope });
				}).error(function(data, status, config) {
					alert("There was a problem: " + status);
				});
			}
	])