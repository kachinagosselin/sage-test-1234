'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('transactionIndex', {
        url: '/transactions',
        templateUrl: 'app/transactionsIndex/transactionsIndex.html',
        controller: 'TransactionsIndexCtrl'
      });

  });
