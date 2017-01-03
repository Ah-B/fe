app.controller('booksController', function($scope, $http,$timeout) {
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
          $scope.genreFilter = "Romance";


        for (book of data) {
            if ($scope.genres.indexOf(book.genre) === -1) {
                $scope.genres.push(book.genre)
            }
        }
        console.log(data);

        //if genre diff from null
        $timeout(function(){
          $("#genreElemRomance").addClass('active');
        });

    });
});
