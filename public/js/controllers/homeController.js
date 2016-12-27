app.controller('homeController', function($scope, $http) {
    $scope.reminder = false;
    console.log($scope.reminder);

    $scope.closePaymentPage = function() {
        $scope.reminder = true;
        console.log($scope.reminder);
    }

    $scope.$watch('currentUser', function() {
        $http.get('/api/user/' + $scope.currentUser).success(function(data) {
            $scope.user = data;

            $scope.getTopAuthors();
            $scope.getBookComments();
        });
    });

    $scope.getTopBooks = function() {
        $http.get('/api/book').success(function(data) {
            var ratings = [];
            var times = 0;
            var count = 0;

            for (book of data) {
                {
                    for (rating of book.ratings) {
                        count = count + rating.rating;
                        times++;
                    }
                    var avg = count / times;
                    ratings.push({
                        book: book,
                        average: avg
                    });
                }
            }
            ratings.sort(function(a, b) {
                return parseFloat(b.average) - parseFloat(a.average);
            });
            $scope.topRatedBooks = ratings;
        });
    };

    $scope.getTopAuthors = function() {
        $http.get('/api/author').success(function(data) {
            var ratings = [];
            var times = 0;
            var count = 0;

            for (author of data) {
                {
                    for (rating of author.ratings) {
                        count = count + rating.rating;
                        times++;
                    }
                    var avg = count / times;
                    ratings.push({
                        author: author,
                        average: avg
                    });
                }
            }
            ratings.sort(function(a, b) {
                return parseFloat(b.average) - parseFloat(a.average);
            });
            $scope.topRatedAuthor = ratings;
        });
    };

    $scope.getBookComments = function() {
      var comments = [];
      var sysDate = new Date();
        $http.get('/api/book').success(function(data) {
          for (user of data) {
            for (comment of user.comments ) {
                var commentHours = new Date(comment.date);
                if
            };
          }
          console.log(comments);
        });


    };


});
