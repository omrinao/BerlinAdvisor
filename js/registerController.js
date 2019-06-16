angular.module("myApp").controller("registerController", function ($scope,$http,$window,$location) {
  $scope.submit = function(){
    var userName = document.getElementById("userName").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var Password = document.getElementById("Password").value;
    var Contry = document.getElementById("Contry").value;
    var City = document.getElementById("City").value;
    var Email = document.getElementById("Email").value;
    var Queston1 = document.getElementById("Queston1").value;
    var Answer1 = document.getElementById("Answer1").value;
    var Queston2 = document.getElementById("Queston2").value;
    var Answer2 = document.getElementById("Answer2").value;
    var sights = document.getElementById("sights").checked;
    var museums = document.getElementById("museums").checked;
    var rastaurants = document.getElementById("rastaurants").checked;
    var shopping = document.getElementById("shopping").checked;
    let serverUrl='http://localhost:3000/';
    var req = {
        method: 'POST',
        url: serverUrl + "register",
          data: {
            username : userName , password : Password ,
            fName : firstName , lName : lastName ,
            city : City , country : Contry ,
            question1 : Queston1 , answer1 : Answer1,
            question2 : Queston2 , answer2 : Answer2,
            sights : sights , museums : museums,
            rastaurants : rastaurants, shopping : shopping,
            Email : Email
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

