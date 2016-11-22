app.controller('readerController', function($scope) {


    $scope.pdfName = 'The special and general theory of relativity';
    $scope.bookName = "book2";
    $scope.pdfUrl = 'pdf/' + $scope.bookName + '.pdf';
    // $scope.scroll = 0;
    // $scope.current = 1;
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
