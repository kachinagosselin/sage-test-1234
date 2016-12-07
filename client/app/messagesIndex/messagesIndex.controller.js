'use strict';

angular.module('paizaqaApp')
.controller('MessagesIndexCtrl', function ($scope, $http) {
  $scope.busy = true;
  $scope.noMoreData = false;

	$http.get('/api/messages').success(function(messages) {
		console.log("Call once ... ")
	});

});
