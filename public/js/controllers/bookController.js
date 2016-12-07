app.controller('bookController', function($scope, $http) {
    $scope.comment = function() {
        var req = {
            method: 'POST',
            url: '/api/book/comment/' + $scope.bookId + '/' + $scope.currentUser,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                text: $scope.commentModel
            }
        }

        $http(req).then(function() {
            $scope.getBookData();
        });

    }
    $scope.rate = function() {
        var req = {
            method: 'POST',
            url: '/api/book/rate/' + $scope.bookId + '/' + $scope.currentUser,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                rating: $scope.ratingModel
            }
        }

        $http(req).then(function(message) {
            console.log(message.data);
            if (message.data.type === "successMessage") {
                $scope.getBookData();
            }
        });
    }
    $scope.addToLibrary = function() {
        if ($scope.user.type == "free" && $scope.book.type == "premium") {
            alert('for premium members only')
        } else {
            var req = {
                method: 'POST',
                url: '/api/user/addToLibrary/' + $scope.currentUser + '/' + $scope.bookId,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http(req).then(function(message) {
                // TODO: This return data MUST be shown as a toast or popup message
                alert(message.data.content);
            });
        }
    }

    $scope.getBookData = function() {
        $http.get('/api/book/' + $scope.bookId).success(function(data) {
            $scope.book = data;
            console.log(data);
            var average = 0;
            var count = 0;
            for (rate of $scope.book.ratings) {
                average = average + rate.rating;
                count++;
            }
            $scope.rating = average / count;
            //  console.log($scope.rating);

            $scope.comments = $scope.book.comments;
        });
    }

    $scope.$watch(['bookId', 'currentUser'], function() {
        $http.get('/api/user/' + $scope.currentUser).success(function(data) {
            $scope.user = data;
        });
        $scope.getBookData();
    });


});
