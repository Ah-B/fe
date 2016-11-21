
app.controller('authorsController', function($scope, $http) {
    $scope.authorOrder = "fName";

    $http.get('/api/author/').success(function(data) {
        $scope.authors = data;
        console.log(data);
    });
});

app.controller('authorController', function($scope, $http) {

//  WAIT FOR SCOPE INIT
//   $scope.$watch('pageTitle', function () {
//     console.log($scope.pageTitle);
// });

    $scope.$watch('authorid', function() {
        console.log($scope.authorid);
        $http.get('/api/author/' + $scope.authorid).success(function(data) {
            $scope.author = data;
            console.log($scope.author);
        });
    });


});
