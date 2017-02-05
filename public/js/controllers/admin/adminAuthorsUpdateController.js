app.controller('adminAuthorsUpdateController', function($scope, $http, $timeout) {



    $scope.$watch(['authorId'], function() {
      $http.get('/api/author/' + $scope.authorId).success(function(data) {
        $scope.updatefNameModel = data.fName;
        $scope.updatelNameModel = data.lName;
        $scope.updateBirthDateModel = data.birthDate;
        $scope.updateDeathDateModel = data.deathDate;
        $scope.updateDescriptionModel = data.description;
        $scope.updateImageModel = data.imageUrl;
      })

    });


    $scope.updateAuthor = function(){

      var req = {
          method: 'POST',
          url: '/api/author/'+ $scope.authorId,
          headers: {
              'Content-Type': 'application/json'
          },
          data: {
          fName:   $scope.updatefNameModel,
          lName: $scope.updatelNameModel,
          birthDate: $scope.updateBirthDateModel,
          deathDate: $scope.updateDeathDateModel,
          description: $scope.updateDescriptionModel,
          imageUrl: $scope.updateImageModel
          }
      }

      $http(req).then(function() {
        window.location.href = '/admin/authors';
      });


    }

});
