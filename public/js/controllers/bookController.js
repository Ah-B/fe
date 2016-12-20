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
        swal({
            title: "Rate book",
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
            if (inputValue > 10) {
                swal.showInputError("Rating should be on an 10 scale ");
                return false;
            };
            if (isNaN(inputValue)) {
                swal.showInputError("Rating should be a number ");
                return false;
            };
            var req = {
                method: 'POST',
                url: '/api/book/rate/' + $scope.bookId + '/' + $scope.currentUser,
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
                    $scope.getBookData();
                } else {
                    swal("Error", " " + message.data.content, "error");
                }
            });
        });

    }
    $scope.addToLibrary = function() {
        if ($scope.user.type == "free" && $scope.book.type == "premium") {
            swal("Premium Content", "This book is for premium members only", "error");
        } else {
            var req = {
                method: 'POST',
                url: '/api/user/addToLibrary/' + $scope.currentUser + '/' + $scope.bookId,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http(req).then(function(message) {
                if (message.data.type === "successMessage") {
                    swal("Book added !", " " + message.data.content);
                } else {
                    swal("Already in library", " " + message.data.content, "warning");
                }
            });
        }
    }
    $scope.getBooksSameAuthor = function() {
        $http.get('/api/book/').success(function(data){
            $scope.sameAuthor = [];
            for (book of data) {
                if (book.author._id == $scope.book.author._id && book.title != $scope.book.title ) {
                    $scope.sameAuthor.push(book);
                }
            }
        })

    };
    $scope.getBookData = function() {
        $http.get('/api/book/' + $scope.bookId).success(function(data) {
            $scope.book = data;
            console.log(data);
            $scope.authorImageUrl = "/Images/" + data.author.imageUrl;
            console.log($scope.authorImageUrl);
            var average = 0;
            var count = 0;
            for (rate of $scope.book.ratings) {
                average = average + rate.rating;
                count++;
            }
            $scope.rating = (average / count).toFixed(1);
            $scope.comments = $scope.book.comments;
            $scope.getBooksSameAuthor();

        });

    }

    $scope.$watch(['bookId', 'currentUser'], function() {
        $http.get('/api/user/' + $scope.currentUser).success(function(data) {
            $scope.user = data;
        });
        $scope.getBookData();
    });


});
