'use strict';

angular.module('paizaqaApp')
.controller('TransactionsIndexCtrl', function ($scope, $http) {
  $scope.busy = true;
  $scope.noMoreData = false;

  $http.get('/api/transactions').success(function(transactions) {
    $scope.transactions = transactions;
    if($scope.transactions.length < 20){
      $scope.noMoreData = true;
    }
    $scope.busy = false;
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
  });
