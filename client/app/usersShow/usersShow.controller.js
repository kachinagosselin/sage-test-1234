'use strict';

angular.module('paizaqaApp')
.controller('UsersShowCtrl', function ($scope, $http, $stateParams, Auth, $location) {


  var loadUsers = function(){
    $http.get('/api/users/' + $stateParams.id).success(function(user) {
      $scope.user = user;
    });
  };
  loadUsers();

  // $scope.updateUser = function() {
  //     console.log("In the update function ")

  //     loadUsers();
  //   });
  // };

  $scope.updateUser = function(){
    console.log("In the update function ")
    $http.put('/api/users/' + $stateParams.id, $scope.user).success(function(){
      console.log("Next ...")
      loadUsers();
    });
  };


});
