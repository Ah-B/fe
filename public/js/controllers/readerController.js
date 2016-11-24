app.controller('readerController', function($scope, $http) {


    // $http.get('/api/book/58244bba79f4dc2a5c9423f3').success(function(data) {
    //   $scope.pdfUrl=data.pdfUrl;
    //   console.log(data);
    //
    // });
    // $scope.pdfUrl=data.pdfUrl;
    //$scope.bookName = "book2";
    //$scope.pdfUrl = 'pdf/' + $scope.bookName + '.pdf';
    $scope.$watch(['currentUser'], function() {
    });

    $scope.scroll = 0;
    $scope.current = 1;
    $scope.pagesReadCounter = 1;
    $scope.startTime;
    $scope.ngReaderStop = function() {
        console.log("**************** Reader Stopped : //Substract Dates + //Get counter ****************");
        var startTime = $scope.startTime;
        var endTime = moment();
        console.log("End time " + endTime.format("HH:mm"));
        //var duration = endTime.diff(startTime, 'minutes');
        var duration = endTime.diff(startTime, 'seconds');

        console.log("Duration: " + duration);
        console.log("Pages Read : " + $scope.pagesReadCounter);
        //POST to DB:User:habits
        var reqHabit = {
            method: 'POST',
            url: '/api/user/addHabit/' + $scope.currentUser,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                time: duration,
                pagesRead: $scope.pagesReadCounter
            }
        };
        var reqLib = {
            method: 'POST',
            url: '/api/user/addLibraryData/' + $scope.currentUser + '/' + $scope.bookId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                time: duration,
                lastPage: $scope.pagesReadCounter,
                lastReadDate: endTime
            }
        };
        $http(reqLib, reqHabit).then(function() {
            console.log("habit added");
            $scope.pagesReadCounter = 1;
            location.reload();
        });


    }
    $scope.ngReaderStart = function(url, name, id, lastPage) {
        $scope.pdfUrl = url;
        $scope.pdfName = name;
        $scope.bookId = id;
        $scope.startTime = moment();
        $scope.myPage = lastPage;
        console.log("lastpage"+lastPage);
        console.log("**************** Reader Started : //Add Date + //Start counter **************** ");
        console.log("Start time " + $scope.startTime.format("HH:mm"));
    };
    $scope.pageFinished = function() {
        $scope.pagesReadCounter++;
    }

    $scope.getNavStyle = function(scroll) {
        if (scroll > 100) return 'pdf-controls fixed';
        else return 'pdf-controls';
    }

    $scope.onError = function(error) {
        console.log(error);
    }

    $scope.onLoad = function() {
        $scope.loading = '';
    }

});
