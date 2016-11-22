app.controller('authorsController', function($scope, $http) {
    $scope.authorOrder = "fName";

    $http.get('/api/author/').success(function(data) {
        $scope.authors = data;
        console.log(data);
    });
});
