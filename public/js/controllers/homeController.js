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
        })
        // .then(function() {
        // });
    });
});
