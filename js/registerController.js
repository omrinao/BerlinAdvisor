angular.module("myApp").controller("registerController", function ($scope) {
    $scope.submit = function(){
      let serverUrl='http://localhost:3000/';
      var data = $.param({
          method: 'POST',
          url: serverUrl + "register",
          data: $scope.data
          })
          $http(req).then(function successCallback(response) {
              $scope.token = response;
              $window.location.href = serverUrl; 
            }, function errorCallback(response) {
              $window.location.href = serverUrl; 
            });
    };
    $scope.notValid = true;
    $scope.checkFOIs = function(){
      var sights = document.getElementById("sights").checked;
      var museums = document.getElementById("museums").checked;
      var rastaurants = document.getElementById("rastaurants").checked;
      var shopping = document.getElementById("shopping").checked;
      var counter = 0
      if (sights == true){
        counter++
      }
      if (museums == true){
        counter++
      }
      if (rastaurants == true){
        counter++
      }
      if (shopping == true){
        counter++
      }
      if (counter <= 1){
        $scope.notValid = true;
      }
      else{
        $scope.notValid = false;
      }
  }
});

