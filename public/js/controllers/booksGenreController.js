app.controller('booksGenreController', function($scope, $http,$timeout) {
    $scope.bookOrder = "title";


    $scope.changeGenre = function(event, genre) {
        $(".list-group-item").removeClass('active')
        $(event.target).addClass('active');
        if (genre == 'All') {
            $scope.genreFilter = "";
        }
        $scope.genreFilter = genre;
    }

    $http.get('/api/book/').success(function(data) {
        $scope.books = data;
        $scope.genres = ['All'];
        $scope.genreFilter = $scope.linkGenre;


        for (book of data) {
            if ($scope.genres.indexOf(book.genre) === -1) {
                $scope.genres.push(book.genre)
            }
        }
        console.log($scope.linkGenre);

        $timeout(function(){
          var elemId = "#genreElem"+$scope.linkGenre;
          console.log("dataname",elemId);
          $(elemId).addClass('active');

        });


    });
});
