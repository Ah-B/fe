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
        for (db of data) {
          var rating = 0;
          var times = 0;
            for (ratings of db.ratings) {
                rating = rating + ratings.rating;
                times = times +1;
            }
            db.computedRating = (rating/times).toFixed(1);
        }
        $scope.books = data;
        $scope.genres = ['All'];
        $scope.genreFilter = "";


        for (book of data) {
            if ($scope.genres.indexOf(book.genre) === -1) {
                $scope.genres.push(book.genre)
            }
        }
        $timeout(function(){
          $("#genreElemAll").addClass('active');
        });


    });
});
