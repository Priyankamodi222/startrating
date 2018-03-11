angular.module('RatingTutorial', [])
  .controller('RatingCtrl', function($scope, $http) {
    $scope.rating = 0;
    $scope.rateFunction = function(rating) {
      alert('Rating selected - ' + rating);
    };

    $scope.getData = function() {
      
      console.log("function called");
      var req = {

      method: 'POST',

      url: 'http://localhost:8888/getdata',

      data:{ name : "Priyanka Modi"}

      };



      $http(req).then(function (result) {
        $scope.rating = Number(result.data[0].rating1) + 1;
        console.log(result.data[0]);
        console.log("$scope.rating : " + $scope.rating);

      });
    };

    $scope.postData = function() {
      
      console.log("function called");
      var req = {

      method: 'POST',

      url: 'http://localhost:8888/postdata',

      data:{"rating": Number($scope.rating)-1}

      };



      $http(req).then(function (result) {
        console.log(result);

      });
    };
  })
  .directive('starRating',
  function() {
    return {
      restrict : 'A',
      template : '<ul class="rating">'
           + '  <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
           + '\u2605'
           + '</li>'
           + '</ul>',
      scope : {
        ratingValue : '=',
        max : '=',
        onRatingSelected : '&'
      },
      link : function(scope, elem, attrs) {
        var updateStars = function() {
          scope.stars = [];
          for ( var i = 1; i < scope.max; i++) {
            scope.stars.push({
              filled : i < scope.ratingValue
            });
          }
        };
        
        scope.toggle = function(index) {
          scope.ratingValue = index + 2;
          scope.onRatingSelected({
            rating : index + 1
          });
        };
        
        scope.$watch('ratingValue',
          function(oldVal, newVal) {
            if (newVal) {
              updateStars();
            }
          }
        );
      }
    };
  }
);