app.controller('adminBooksController', function($scope, $http, $timeout) {

  $http.get('/api/author/').success(function(data) {
      $scope.authors = data;
  });



$scope.addBook= function(){

console.log($scope.addTitleModel);
console.log($scope.addAuthorModel);
console.log($scope.addTypeModel);
console.log($scope.addDescriptionModel);
console.log($scope.addDateModel);
console.log($scope.addGenreModel);
console.log($scope.addPdfModel);
console.log($scope.addImageModel);

var req = {
    method: 'POST',
    url: '/api/book/',
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
        title: $scope.addTitleModel,
        author:$scope.addAuthorModel,
        type:$scope.addTypeModel,
        description:$scope.addDescriptionModel,
        date:$scope.addDateModel,
        genre:$scope.addGenreModel,
        pdfUrl:$scope.addPdfModel,
        imageUrl:$scope.addImageModel,
        ratings : []
    }
}

$http(req).then(function() {
  window.location.href = '/admin/books';
});

}




    $scope.getBooks = function() {
      $http.get('/api/book/').success(function(data) {
          $scope.books = data;
      });
    }
    $scope.getBooks();

    $scope.removeBook = function(id) {
        $http.delete('/api/book/' + id).success(function() {
            $scope.getBooks();
        });

    }




});
