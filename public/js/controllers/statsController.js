app.controller('statsController', function($scope, $http) {

    var finalDates = [];
    var finalPagesValues = [];
    var finalMonthDates = [];
    var finalMonthPagesValues = [];
    var pagesPerMinutes = [];
    var pagesPerMinutesDates = [];

    var timeSpentBookNames = [];
    var timeSpentBookTime = [];
    var timeSpentAuthorTime = [];
    var timeSpentAuthorNames = [];

    var timeSpentGenreTime = [];
    var timeSpentGenreNames = [];
    var preferenceAuthor = [];
    var preferenceAuthorPages = [];
    var preferenceGenre = [];
    var preferenceGenrePages = [];

    $scope.$watch('currentUser', function() {
        $http.get('/api/user/' + $scope.currentUser).success(function(data) {
            $scope.pagePerDateFunction(data);
            $scope.pagePerDateMonthFunction(data);

            $scope.pageMinutesPerDateFunction(data);
            $scope.timeSpentBookFunction(data);
            $scope.timeSpentAuthorFunction(data);
            $scope.timeSpentGenreFunction(data);
            $scope.preferenceAuthorFunction(data);
            $scope.preferenceGenreFunction(data);

        });
    });


    $scope.pagePerDateMonthFunction = function(data) {

        var dates = [];

        for (book of data.habits) {
            if(moment(book.date).format("MMMM") == moment().format("MMMM"))
            {
              dates.push(moment(book.date).format("Do dddd"));
            }
        }
        //REMOVE DUPLICATES
        var dates = dates.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            })

        console.log("aa",dates);

        var finalMonthArray = [];
        for (elem of dates) {
            finalMonthArray.push({
                date: elem,
                pages: 0
            })
        }
        for (elem of finalMonthArray) {
            for (book of data.habits) {
                if (elem.date == moment(book.date).format("Do dddd")) {
                    elem.pages = elem.pages + book.pagesRead;
                }
            }
        }



        for (elem of finalMonthArray) {
          //Format day word
            finalMonthDates.push(elem.date);
            finalMonthPagesValues.push(elem.pages)
        }



    }
    $scope.pagePerDateMonth = {
    datasets: [{
        data: finalMonthPagesValues,
        backgroundColor: [
          "#4CB6CB",
          "#545CA6",
          "#2EA0B6",
          "#1AB667",
          "#FAD733",
          "#F05050"
        ],
        label: finalMonthDates // for legend
    }],
    labels: finalMonthDates
    };





    $scope.preferenceGenreFunction = function(data) {
      var genres = [];
      var uniqueGenres = [];
      for (book of data.library) {
          //if(book.book.genre !== undefined)
          genres.push(book.book.genre);
      }

      uniqueGenres = genres.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
      });

      for (uniqueGenre of uniqueGenres) {
          var pages = 0;
          for (book of data.library) {
              if (uniqueGenre == book.book.genre) {
                  pages = pages + book.lastPage;
              }
          }
          if (pages !== 0) {
              preferenceGenrePages.push(pages);
          }
      }


      for (genre of uniqueGenres) {
          preferenceGenre.push(genre);
      }
    };
    $scope.preferenceGenre = {
        labels:preferenceGenre ,
        datasets: [{
            data: preferenceGenrePages,
            backgroundColor: [
                "#4CB6CB",
                "#545CA6",
                "#2EA0B6",
                "#1AB667",
                "#FAD733",
                "#F05050"
            ]
        }]
    };

    $scope.preferenceAuthorFunction = function(data) {
        var authorIds = [];
        var uniqueAuthorIds = [];
        for (book of data.library) {
            authorIds.push(book.book.author);

        }
        var uniqueAuthorIds = authorIds.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        })

        for (uniqueId of uniqueAuthorIds) {
            var pages = 0;
            for (book of data.library) {
                if (uniqueId == book.book.author) {
                    console.log("here");
                    pages = pages + book.lastPage;
                }
            }
            if (pages !== 0) {
                preferenceAuthorPages.push(pages);
            }
        }
        console.log("pages", preferenceAuthorPages);


        $http.get('/api/author/').success(function(data) {

            for (authorId of uniqueAuthorIds) {
                for (author of data) {
                    if (authorId == author._id) {
                        preferenceAuthor.push(author.fName + " " + author.lName);
                    }
                }
            }

            console.log("authors", preferenceAuthor);
        })
    };
    $scope.preferenceAuthor = {
        labels:preferenceAuthor ,
        datasets: [{
            data: preferenceAuthorPages,
            backgroundColor: [
                "#4CB6CB",
                "#545CA6",
                "#2EA0B6",
                "#1AB667",
                "#FAD733",
                "#F05050"
            ]
        }]
    }
    $scope.timeSpentGenreFunction = function(data) {
        var genres = [];
        var uniqueGenres = [];
        for (book of data.library) {
            //if(book.book.genre !== undefined)
            genres.push(book.book.genre);
        }

        uniqueGenres = genres.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });

        for (uniqueGenre of uniqueGenres) {
            var fullTime = 0;
            for (book of data.library) {
                if (uniqueGenre == book.book.genre) {
                    fullTime = fullTime + book.time;
                }
            }
            if (fullTime !== 0) {
                timeSpentGenreTime.push(fullTime.toFixed(1));
            }
        }

        for (genre of uniqueGenres) {
            timeSpentGenreNames.push(genre);
        }
    };
    $scope.timeSpentGenre = {
        labels: timeSpentGenreNames,
        datasets: [{
            data: timeSpentGenreTime,
            backgroundColor: [
                "#4CB6CB",
                "#545CA6",
                "#2EA0B6",
                "#1AB667",
                "#FAD733",
                "#F05050"
            ]
        }]
    }




    $scope.timeSpentBookFunction = function(data) {
        for (book of data.library) {
            timeSpentBookTime.push((book.time / 60).toFixed(1));
            timeSpentBookNames.push(book.book.title);
        }

    }

    $scope.timeSpentBook = {
        labels: timeSpentBookNames,
        datasets: [{
            data: timeSpentBookTime,
            backgroundColor: [
                "#4CB6CB",
                "#545CA6",
                "#2EA0B6",
                "#1AB667",
                "#FAD733",
                "#F05050"
            ]
        }]
    }


    $scope.timeSpentAuthorFunction = function(data) {
        var authorIds = [];
        var uniqueAuthorIds = [];
        for (book of data.library) {
            //timeSpentAuthorTime.push((book.time/60).toFixed(1));
            authorIds.push(book.book.author);

        }
        var uniqueAuthorIds = authorIds.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        })

        for (uniqueId of uniqueAuthorIds) {
            var fullTime = 0;
            for (book of data.library) {
                if (uniqueId == book.book.author) {
                    console.log("here");
                    fullTime = fullTime + book.time;
                }
            }
            if (fullTime !== 0) {
                timeSpentAuthorTime.push(fullTime.toFixed(1));
            }
        }


        $http.get('/api/author/').success(function(data) {

            for (authorId of uniqueAuthorIds) {
                for (author of data) {
                    if (authorId == author._id) {
                        timeSpentAuthorNames.push(author.fName + " " + author.lName);
                    }
                }
            }
            console.log(timeSpentAuthorNames);
        })
    }

    $scope.timeSpentAuthor = {
        labels: timeSpentAuthorNames,
        datasets: [{
            data: timeSpentAuthorTime,
            backgroundColor: [
                "#4CB6CB",
                "#545CA6",
                "#2EA0B6",
                "#1AB667",
                "#FAD733",
                "#F05050"
            ]
        }]
    }





    $scope.pagePerDateFunction = function(data) {

        console.log($scope.currentUser);
        var dates = [];

        for (book of data.habits) {
            dates.push(moment(book.date).format("MMMM Do YYYY"));
        }

        //REMOVE DUPLICATES
        var dates = dates.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            })
            //SORTIGN DATES
        var dates = dates.sort(function(left, right) {
            return moment.utc(left.timeStamp).diff(moment.utc(right.timeStamp))
        });
        var finalArray = [];
        for (elem of dates) {
            finalArray.push({
                date: elem,
                pages: 0
            })
        }
        for (elem of finalArray) {
            for (book of data.habits) {
                if (elem.date == moment(book.date).format("MMMM Do YYYY")) {
                    elem.pages = elem.pages + book.pagesRead;
                }
            }
        }



        for (elem of finalArray) {
            //console.log("raw",elem);

            finalDates.push(elem.date);

            finalPagesValues.push(elem.pages)
        }



    }
    $scope.pagePerDate = {
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

    $scope.pageMinutesPerDateFunction = function(data) {


        var dates = [];

        for (book of data.habits) {
            dates.push(moment(book.date).format("MMMM Do YYYY"));
        }


        //REMOVE DUPLICATES
        var dates = dates.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        })

        //SORTIGN DATES
        var dates = dates.sort(function(left, right) {
            return moment.utc(left.timeStamp).diff(moment.utc(right.timeStamp))
        });
        var finalArray = [];
        for (elem of dates) {
            finalArray.push({
                date: elem,
                pages: 0,
                time: 0
            })
        }

        for (elem of finalArray) {
            for (book of data.habits) {
                if (elem.date == moment(book.date).format("MMMM Do YYYY")) {
                    elem.pages = elem.pages + book.pagesRead;
                    elem.time = elem.time + book.time;
                }
            }
        }



        for (elem of finalArray) {
            pagesPerMinutesDates.push(elem.date);
            pagesPerMinutes.push(((elem.pages / elem.time) * 60).toFixed(1));
        }


    }
    $scope.pageMinutesPerDate = {
        labels: pagesPerMinutesDates,
        datasets: [{
            label: "Pages per minutes",
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
            data: pagesPerMinutes,
            spanGaps: false,
        }]
    };

});
