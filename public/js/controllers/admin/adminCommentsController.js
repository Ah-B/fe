app.controller('adminCommentsController', function($scope, $http, $timeout) {


    $scope.loadComments = function() {
        var ngComments = [];

        $http.get('/api/author/').success(function(data) {
            for (author of data) {
                for (comment of author.comments) {
                    ngComments.push({"comment": comment,
                  "subject":author.fName+" "+author.lName});
                }
            }
        });



        $http.get('/api/book/').success(function(data) {
            for (book of data) {
                for (comment of book.comments) {
                    ngComments.push({
                        "comment": comment,
                        "subject": book.title
                    })
                    console.log(ngComments);
                }
            }
        });

        $scope.comments = ngComments;
        console.log($scope.comments);
    };

    $scope.loadComments();

    $scope.removeComment = function(id) {
        $http.get('/api/author/').success(function(data) {
            var found = "book";
            for (author of data) {
                for (comment of author.comments) {
                    if (comment._id == id) {
                        found = "author";
                        break;
                    }
                }
            };
            console.log(found);
            if (found == "book") {
                //removeBook
                $http.delete('/api/book/comment/' + id).success(function(data) {
                    $scope.loadComments();
                });
            } else if (found == "author") {
                //removeAuthor
                $http.delete('/api/author/comment/' + id).success(function(data) {
                    $scope.loadComments();
                });
            }

        });
    }


});
