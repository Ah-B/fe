app.controller('readerController', function($scope, $http) {

    $scope.$watch(['currentUser', 'currentBookId'], function() {
        $http.get('/api/user/' + $scope.currentUser).success(function(data) {
            $scope.user = data;
            for (book of data.library) {
                if (book.book._id === $scope.currentBookId) {
                    $scope.currentBook = book;
                    console.log("current book", $scope.currentBook);
                }
            }

            // console.log($scope.user);
            // console.log("current",$scope.currentBook);
            // // $scope.currentPage=$scope.currentBook.lastPage;
            $scope.currentPageCounter = $scope.currentBook.lastPage;
            // console.log($scope.page);
            $http.get('/api/book/' + $scope.currentBook.book._id).success(function(data) {
                console.log(data);
                $scope.currentBookAuthor = data.author;
            })
        });
    });
    //$scope.scroll = 0;
    //$scope.current = 1;

    $scope.pagesReadCounter = 0;
    $scope.startTime;
    $scope.ngReaderStop = function() {
        console.log("**************** Reader Stopped : //Substract Dates + //Get counter ****************");
        var startTime = $scope.startTime;
        var endTime = moment();
        var habitDate = moment();
        var duration = endTime.diff(startTime, 'seconds');
        console.log("start time " + $scope.startTime + "End time " + endTime + "Duration: " + duration + "Pages Read : " + $scope.pagesReadCounter);

        //POST to DB:User:habits
        var reqHabit = {
            method: 'POST',
            url: '/api/user/addHabit/' + $scope.currentUser,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                time: duration,
                pagesRead: $scope.pagesReadCounter,
                date: habitDate
            }
        };
        var reqLib = {
            method: 'POST',
            url: '/api/user/addLibraryData/' + $scope.currentUser + '/' + $scope.bookId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                time: $scope.currentBook.time + duration,
                lastPage: $scope.currentPageCounter,
                lastReadDate: endTime
            }
        };
        $http(reqLib).then(function() {
            // console.log("lib request ok");
        });
        $http(reqHabit).then(function() {
            $scope.pagesReadCounter = 1;
            window.location = "/profile";
        });


    }
    $scope.ngReaderStart = function(url, name, id, lastPage) {
        $scope.pdfUrl = url;
        $scope.pdfName = name;
        $scope.bookId = id;
        $scope.startTime = moment();

        console.log("Start time " + $scope.startTime);
    };
    $scope.pageFinished = function() {
        // TODO: test if book ended
        $scope.pagesReadCounter++;
        $scope.currentPageCounter++;
    }
    $scope.prevPage = function() {
        $scope.currentPageCounter--;

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
