app.controller('profileController', function($scope, $http) {
  $scope.readingHabitsPages=0;
  $scope.readingHabitsTime=0;
    $scope.$watch('currentUser', function() {
        $http.get('/api/user/' + $scope.currentUser).success(function(data) {
            $scope.user = data;
            console.log(data);
            for (habit of $scope.user.habits) {
              // console.log(habit.pagesRead);
              $scope.readingHabitsPages= $scope.readingHabitsPages+habit.pagesRead;
              $scope.readingHabitsTime= $scope.readingHabitsTime+habit.time;
            }
        }).then(function(){
          // console.log("test");
          $scope.readingHabitsTime= $scope.readingHabitsTime+habit.time;

        });
    });


});
