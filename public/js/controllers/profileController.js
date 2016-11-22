app.controller('profileController', function($scope, $http) {
    $scope.$watch('currentUser', function() {
        console.log($scope.currentUser);

        $http.get('/api/user/' + $scope.currentUser).success(function(data) {
            $scope.user = data;
            console.log(data);
        });
    });
});
