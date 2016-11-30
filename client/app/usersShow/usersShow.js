'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('usersShow', {
        url: '/users/show/:id',
        templateUrl: 'app/usersShow/index.html',
        controller: 'UsersShowCtrl'
      });
  });
