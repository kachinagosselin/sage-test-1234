'use strict';

angular.module('paizaqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('messageIndex', {
        url: '/messages',
        templateUrl: 'app/messagesIndex/index.html',
        controller: 'MessagesIndexCtrl'
      });

  });
