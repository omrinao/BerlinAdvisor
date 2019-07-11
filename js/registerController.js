angular.module("myApp").controller("registerController", function ($scope,$http,$window,$location) {
  $scope.submitReg = function(){
    let serverUrl='http://localhost:3000/';
    var req = {
        method: 'POST',
        url: serverUrl + "register",
          data: {
            username : $scope.userName , password : $scope.rpassword ,
            fName : $scope.firstName , lName : $scope.lastName ,
            city : $scope.City , country : $scope.rcountry ,
            question1 : $scope.rQuestion1 , answer1 : $scope.rAnswer1,
            question2 : $scope.rQuestion2 , answer2 : $scope.rAnswer2,
            sights : $scope.rSights , museums : $scope.rMuseums,
            restaurants : $scope.rRestaurants, shopping : $scope.rShopping,
            Email : $scope.rEmail
          }
      }
        $http(req).then(function successCallback(response) {
            if (response.data === "User name already exists"){
              window.alert("user name already taken, please choose another one")
            }else {
              $window.alert("register succeeded!")
              $location.path("/login")
            }
          }, function errorCallback(response) {
            $location.path("/register.html");
          });
  };



  $scope.notValid = true;
  $scope.checkFOIs = function(event){
    var counter = 0
    if (($scope.rSights !== true && event.target.id === 'sights') || ($scope.rSights === true && event.target.id !== 'sights')){
      counter++
    }
    if (($scope.rMuseums !== true && event.target.id === 'museums') || ($scope.rMuseums === true && event.target.id !== 'museums')){
      counter++
    }
    if (($scope.rRastaurants !== true && event.target.id === 'rastaurants') || ($scope.rRastaurants === true && event.target.id !== 'rastaurants')){
      counter++
    }
    if (($scope.rShopping !== true && event.target.id === 'shopping') || ($scope.rShopping === true && event.target.id !== 'shopping')){
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

