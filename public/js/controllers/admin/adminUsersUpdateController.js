app.controller('adminUsersUpdateController', function($scope, $http, $timeout) {



    $scope.$watch(['userId'], function() {
      $http.get('/api/user/' + $scope.userId).success(function(data) {
        $scope.updatefNameModel = data.fName;
        $scope.updatelNameModel = data.lName;
        $scope.updatePasswordModel = data.password;
        $scope.updateUsernameModel = data.username;
        $scope.updateEmailModel = data.email;
        $scope.updateTypeModel = data.type;

      })

    });


    $scope.updateUser = function(){

      var req = {
          method: 'POST',
          url: '/api/user/'+ $scope.userId,
          headers: {
              'Content-Type': 'application/json'
          },
          data: {
          fName:   $scope.updatefNameModel,
          lName: $scope.updatelNameModel,
          password: $scope.updatePasswordModel,
          username: $scope.updateUsernameModel,
          email: $scope.updateEmailModel,
          type: $scope.updateTypeModel
          }
      }

      $http(req).then(function() {
        window.location.href = '/admin/users';
      });

    }

});
