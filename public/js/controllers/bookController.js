app.controller('bookController', function($scope, $http) {
  $http.get('/api/book/').success(function(data){
    $scope.books = data;
    console.log(data);
  });
});
