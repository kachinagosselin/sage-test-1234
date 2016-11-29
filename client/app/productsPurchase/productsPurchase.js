
'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('productsShow', {
        url: '/products/show/:id',
        templateUrl: 'app/productsPurchase/productsPurchase.html',
        controller: 'ProductsPurchaseCtrl'
      });
  });
