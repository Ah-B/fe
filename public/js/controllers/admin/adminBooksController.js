app.controller('adminBooksController', function($scope, $http,$timeout) {
  $http.get('/api/book/').success(function(data) {

    $scope.books = data;
  });
});
