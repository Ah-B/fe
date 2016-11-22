app.controller('booksController', function($scope, $http) {
  $scope.bookOrder = "title";


  $http.get('/api/book/').success(function(data){
    $scope.books = data;
    console.log(data);
  });
});
