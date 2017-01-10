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
          $scope.getAuthorData();

        });

    }
    $scope.rate = function() {
      swal({
          title: "Rate author",
          text: "Give us your own rating",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          animation: "slide-from-top",
          inputPlaceholder: "Rating / 10 "
      }, function(inputValue) {
          if (inputValue === false) return false;
          if (inputValue === "") {
              swal.showInputError("You need to write something!");
              return false;
          };
          if (inputValue > 10 ) {
              swal.showInputError("Rating should be on an 10 scale ");
              return false;
          };
          if (isNaN(inputValue)) {
              swal.showInputError("Rating should be a number ");
              return false;
          };
          var req = {
              method: 'POST',
              url: '/api/author/rate/' + $scope.authorId + '/' + $scope.currentUser,
              headers: {
                  'Content-Type': 'application/json'
              },
              data: {
                  rating: inputValue
              }
          }
          $http(req).then(function(message) {
              console.log(message.data);
              if (message.data.type === "successMessage") {
                  swal("Rated!", " " + message.data.content);
                  $scope.getAuthorData();
              } else {
                  swal("Error", " " + message.data.content, "error");
              }
          });
      });}


    //     var req = {
    //         method: 'POST',
    //         url: '/api/author/rate/' + $scope.authorId + '/' + $scope.currentUser,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         data: {
    //             rating: $scope.ratingModel
    //         }
    //     }
    //
    //     $http(req).then(function(message) {
    //         console.log(message.data);
    //         if (message.data.type === "successMessage") {
    //             location.reload();
    //         }
    //     });
    //
    //
    // }

      $scope.getAuthorData = function(){
      $http.get('/api/author/' + $scope.authorId).success(function(data) {
          $scope.author = data;
          var average = 0;
          var count = 0;
          for (rate of $scope.author.ratings) {
              average = average + rate.rating;
              count++;
          }
          $scope.rating = (average / count).toFixed(1);
          $scope.books = $scope.author.books;
          $scope.comments = $scope.author.comments;
      });
    };


    $scope.$watch(['authorId', 'currentUser'], function() {
        $scope.getAuthorData();
        $http.get('/api/user/' + $scope.currentUser).success(function(data) {
          $scope.user = data;
        })

    });


});
