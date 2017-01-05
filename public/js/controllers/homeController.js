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
            $scope.getTopBooks();
            $scope.getPopularBooks();


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
                        average: avg.toFixed(1)
                    });
                }
            }
            ratings.sort(function(a, b) {
                return parseFloat(b.average) - parseFloat(a.average);
            });
            $scope.topRatedBooks = ratings;
            console.log(ratings);
        });
    };

    $scope.getTopAuthors = function() {
        $http.get('/api/author').success(function(data) {
            var ratings = [];
            var times = 0;
            var count = 0;

            for (author of data) {
                {
                    if ((typeof author.ratings !== 'undefined' && author.ratings.length > 0)) {
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
            }
            ratings.sort(function(a, b) {
                return parseFloat(b.average) - parseFloat(a.average);
            });
            $scope.topRatedAuthors = ratings;

        });
    };

    var unique = function(array, id) {
        var unique = true;
        for (elem of array) {
            if (elem.book._id == id)
                unique = false;
        }
        return unique;
    }
    $scope.getPopularBooks = function() {
        $http.get('/api/user').success(function(data) {
            var myArray = [];

            for (user of data) {
                for (book of user.library) {

                    var test = unique(myArray, book.book._id)
                    if (test == true) {
                        myArray.push({
                            book: book.book
                        });
                    }
                }
            };

            $scope.popularBooks = myArray;

        });
    }



});
