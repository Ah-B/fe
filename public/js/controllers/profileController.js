app.controller('profileController', function($scope, $http) {
  $http.get('/api/user/'+'582442494f038324f4dfbf50').success(function(data){
    console.log(data);
    $scope.user=data;
  })
});
