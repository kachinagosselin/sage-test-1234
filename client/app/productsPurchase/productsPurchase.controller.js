'use strict';

angular.module('paizaqaApp')
  .controller('ProductsPurchaseCtrl', function ($scope, $http, $stateParams) {
      $http.get('/api/products/' + $stateParams.id).success(function(product) {
        $scope.product = product;
      });
    // $scope.nextPage = function(){
    //   if($scope.busy){ return; }
    //   $scope.busy = true;
    //   var lastId = $scope.products[$scope.products.length-1]._id;
    //   var pageQuery = _.merge(query, {_id: {$lt: lastId}});
    //   $http.get('/api/products', {params: {query: pageQuery}}).success(function(products){
    //     $scope.products = $scope.products.concat(products);
    //     $scope.busy = false;
    //     if(products.length === 0){
    //       $scope.noMoreData = true;
    //     }
    //   });
    // };

    $scope.chargeUser = function(){
    console.log('In the charge function');
    $http.get('/api/products/' + $stateParams.id + '/charge').success(function(){
      console.log('Next ...');
    });
  };
  });
