app.controller('statsController', function($scope, $http) {
    var finalDates = [];
    var finalPagesValues = [];

    $scope.$watch('currentUser', function() {
        $http.get('/api/user/' + $scope.currentUser).success(function(data) {

            console.log($scope.currentUser);

            var dates = [];

            for (book of data.habits) {
                dates.push(book.date)
            }


          var dates = dates.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            })
            dates.sort();
            var finalArray = [];
            for (elem of dates) {
                finalArray.push({
                  date : elem,
                  pages : 0
                })
            }
          for (elem of finalArray) {
              for (book of data.habits) {
                 if(elem.date == book.date){
                   elem.pages = elem.pages + book.pagesRead;
                 }
              }
          }
          console.log(finalArray);
            // var finalPagesValues = []
            for (elem of finalArray) {
                finalDates.push(elem.date);
              finalPagesValues.push(elem.pages)
            }


        });
    });



    $scope.myData = {
        labels: finalDates,
        datasets: [{
            label: "Pages read",
            fill: true,
            lineTension: 0.1,
            fillColor: "#000",
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: finalPagesValues,
            spanGaps: false,
        }]
    };

    $scope.myOptions = {

        // Chart.js options go here
        // e.g. Pie Chart Options http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
    };

    $scope.onChartClick = function(event) {
        console.log(event);
    };

});
