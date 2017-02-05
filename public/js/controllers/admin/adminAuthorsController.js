app.controller('adminAuthorsController', function($scope, $http, $timeout) {

  $http.get('/api/book/').success(function(data) {
    $scope.books = data;
  });


  $scope.getAuthors = function() {
      $http.get('/api/author/').success(function(data) {
          $scope.authors = data;
      });
  }

  $scope.getAuthors();

$scope.removeAuthor = function(id) {
                $http.delete('/api/author/' + id).success(function() {
                        $scope.getAuthors();
                    });
                }

$scope.addAuthor= function(){

                console.log("addfNameModel",$scope.addfNameModel);
                console.log("addlNameModel",$scope.addlNameModel);
                console.log("addBidthDateModel",$scope.addBirthDateModel);
                console.log("addDeathDateModel",$scope.addDeathDateModel);
                console.log("addDescriptionModel",$scope.addDescriptionModel);
                console.log("addImageModel",$scope.addImageModel);

                var req = {
                    method: 'POST',
                    url: '/api/author/',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        fName: $scope.addfNameModel,
                        lName:$scope.addlNameModel,
                        birthDate:$scope.addBirthDateModel,
                        description:$scope.addDescriptionModel,
                        deathDate:$scope.addDeathDateModel,
                        imageUrl:$scope.addImageModel,
                        ratings : []
                    }
                }

                $http(req).then(function() {
                  window.location.href = '/admin/authors';
                });

                }

            });
