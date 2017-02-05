app.controller('adminUsersController', function($scope, $http, $timeout) {

    $scope.getUsers = function() {
        $http.get('/api/user/').success(function(data) {
            $scope.users = data;
        });
    };
    $scope.getUsers();

    $scope.removeUser = function(id) {
        $http.delete('/api/user/' + id).success(function() {
            $scope.getUsers();
        });
    }
    $scope.addUser = function() {
      var req = {
          method: 'POST',
          url: '/api/user/',
          headers: {
              'Content-Type': 'application/json'
          },
          data: {
          fName:   $scope.updatefNameModel,
          lName: $scope.updatelNameModel,
          password: $scope.updatePasswordModel,
          username: $scope.updateUsernameModel,
          email: $scope.updateEmailModel,
          type: $scope.updateTypeModel,
          avatar : "a0"
          }
      }

      $http(req).then(function() {
        window.location.href = '/admin/users';
      });
    }

});
