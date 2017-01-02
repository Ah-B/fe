app.controller('profileController', function($scope, $http) {

    $scope.readingHabitsPages = 0;
    $scope.readingHabitsTime = 0;
    $scope.$watch('currentUser', function() {
        $http.get('/api/user/' + $scope.currentUser).success(function(data) {
            $scope.user = data;
            console.log(data);
            for (habit of $scope.user.habits) {
                $scope.readingHabitsPages = $scope.readingHabitsPages + habit.pagesRead;
                $scope.readingHabitsTime = $scope.readingHabitsTime + habit.time;
            }
            console.log($scope.readingHabitsTime);
        }).then(function() {
            console.log($scope.readingHabitsTime);
            timeFormat();
        });
    });

    function timeFormat() {

        let time = $scope.readingHabitsTime;
        let h = Math.floor(time / 3600),
            m = Math.floor(time % 3600 / 60),
            s = Math.floor(time % 3600 % 60);
        $scope.readingHabitsSeconds = (s < 10 ? "0" : "") + s;
        $scope.readingHabitsMinutes = (m < 10 ? "0" : "") + m;
        $scope.readingHabitsHours = (h > 0 ? h : "0");
    }
});
