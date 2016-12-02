'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('productIndex', {
        url: '/products',
        templateUrl: 'app/productsIndex/productsIndex.html',
        controller: 'ProductsIndexCtrl'
      });

  });
