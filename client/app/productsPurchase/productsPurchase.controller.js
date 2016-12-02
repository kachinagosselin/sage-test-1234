'use strict';

angular.module('paizaqaApp')
.controller('ProductsPurchaseCtrl', function ($scope, $http, $stateParams, Auth) {
  $http.get('/api/products/' + $stateParams.id).success(function(product) {
    $scope.product = product;
  });

  $scope.chargeUser = function(){
    console.log('In the charge function');

    $http.get('/api/products/' + $stateParams.id + '/charge').success(function(){
      console.log('Next ...');
    });
  };
});
