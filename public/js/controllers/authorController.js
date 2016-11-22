app.controller('authorController', function($scope, $http) {

    $scope.comment = function() {
        var req = {
            method: 'POST',
            url: '/api/author/comment/' + $scope.authorId + '/' + $scope.currentUser,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                text: $scope.commentModel
            }
        }

        $http(req).then(function() {
            location.reload();

        });

    }
    $scope.rate = function() {
        var req = {
            method: 'POST',
            url: '/api/author/rate/' + $scope.authorId + '/' + $scope.currentUser,
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
                location.reload();
            }
        });


    }

    //  WAIT FOR SCOPE INIT
    //   $scope.$watch('pageTitle', function () {
    //     console.log($scope.pageTitle);
    // });
    $scope.$watch(['authorId', 'currentUser'], function() {
        console.log($scope.authorId);
        console.log($scope.currentUser);
        $http.get('/api/author/' + $scope.authorId).success(function(data) {
            $scope.author = data;
            var average = 0;
            var count = 0;
            for (rate of $scope.author.ratings) {
                average = average + rate.rating;
                count++;
            }
            $scope.rating = average / count;
            $scope.books = $scope.author.books;
            $scope.comments = $scope.author.comments;
            console.log($scope.author);


        });



    });


});
