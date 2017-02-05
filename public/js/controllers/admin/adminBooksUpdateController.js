app.controller('adminBooksUpdateController', function($scope, $http, $timeout) {


    $http.get('/api/author/').success(function(data) {
        $scope.authors = data;
    });
    $scope.$watch(['bookId'], function() {

        $http.get('/api/book/' + $scope.bookId).success(function(data) {
            $scope.book = data;
            $scope.updateTitleModel = data.title;
            $scope.updateDateModel = data.date;
            $scope.updateDescriptionModel = data.description;
            $scope.updateGenreModel = data.genre;
            $scope.updateTypeModel = data.type;
            $scope.updatePdfModel = data.pdfUrl;
            $scope.updateImageModel = data.imageUrl;
            $scope.updateAuthorModel = data.author._id;

        });

    })

    $scope.updateBook = function() {



    var req = {
        method: 'POST',
        url: '/api/book/'+ $scope.bookId,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            title: $scope.updateTitleModel,
            author:$scope.updateAuthorModel,
            type:$scope.updateTypeModel,
            description:$scope.updateDescriptionModel,
            date:$scope.updateDateModel,
            genre:$scope.updateGenreModel,
            pdfUrl:$scope.updatePdfModel,
            imageUrl:$scope.updateImageModel
        }
    }

    $http(req).then(function() {
      window.location.href = '/admin/books';
    });

  }

})
