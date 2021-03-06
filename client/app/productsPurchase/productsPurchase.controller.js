'use strict';

angular.module('paizaqaApp')
.controller('ProductsPurchaseCtrl', function ($scope, $http, $stateParams) {
	$http.get('/api/products/' + $stateParams.id).success(function(product) {
		$scope.product = product;
	});

	$scope.chargeUser = function(){
		console.log('In the charge function');

		$http.get('/api/products/' + $stateParams.id + '/charge').success(function(){
			console.log('Next ...');
		});
	};

	$scope.getURL = function (productID) {
		return '/api/products/' + productID + '/stripe';
	};

});
