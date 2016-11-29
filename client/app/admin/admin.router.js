'use strict';

angular.module('paizaqaApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin'
      });
  });

angular.module('paizaqaApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('productsIndex', {
        url: '/admin/products',
        templateUrl: 'app/admin/productsIndex/productsIndex.html',
        controller: 'ProductsIndexCtrl',
        controllerAs: 'admin',
        authenticate: 'admin'
      });
  });
