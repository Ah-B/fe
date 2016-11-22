app.controller('bookController', function($scope, $http) {
    $scope.comment = function() {
        var req = {
            method: 'POST',
            url: '/api/book/comment/'+$scope.bookId+'/'+$scope.currentUser,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                text: $scope.commentModel
            }
        }

        $http(req).then(function(){
          location.reload();

        });

    }
    $scope.rate = function() {
        var req = {
            method: 'POST',
            url: '/api/book/rate/'+$scope.bookId+'/'+$scope.currentUser,
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
    $scope.addToLibrary = function(){
      var req = {
          method: 'POST',
          url: '/api/user/addToLibrary/'+$scope.currentUser+'/'+$scope.bookId,
          headers: {
              'Content-Type': 'application/json'
          }
      }
      $http(req).then(function(message){
        // TODO: This return data MUST be shown as a toast or popup message
        console.log(message.data);
      });
    }

    $scope.$watch(['bookId', 'currentUser'], function() {
        console.log($scope.bookId);
        console.log($scope.currentUser);
        $http.get('/api/book/' + $scope.bookId).success(function(data) {
            $scope.book = data;
            console.log(  $scope.book);
            var average = 0;
            var count = 0;
            for (rate of $scope.book.ratings) {
                average = average + rate.rating;
                count++;
            }
            $scope.rating = average / count;
            console.log($scope.rating);

            $scope.comments = $scope.book.comments;

        });



    });


});
