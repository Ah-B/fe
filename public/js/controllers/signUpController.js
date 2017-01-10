app.controller('signUpController', function($scope, $http) {

$http.get('/api/user/').success(function(data) {
    console.log(data);
    $scope.userNames=data;
  });


  $scope.focusOut = function () {
    for (user of $scope.userNames) {
      if($scope.userName==user.username){
        swal("Username already in use");
      }

    }
  }
});
