angular.module('myApp').controller('loginController', ['$rootScope', '$location', '$window', '$scope','$http', 
function($rootScope, $location, $window, $scope, $http) {
    let serverUrl='http://localhost:3000/';
    
    $scope.tryLogin = function(){
      if ($scope.username == null || $scope.password == null || $scope.username == "" || $scope.password == ""){
        alert("Please enter user name and password")
      }
      else $http.post(serverUrl + "login", { "UserName": $scope.username , "Password": $scope.password }, {"headers": {
        'Content-Type': 'application/json', 
      }}).then(function successCallback(response) {
        if (response.data == "Wrong User Name Or Password"){
          $window.alert("Wrong User Name Or Password");
          $location.path("/login");
          $scope.username = "";
          $scope.password = "";

        }
        else if (response.data == null || response.data.length < 1){
          $window.alert("Wrong User Name Or Password");
          $scope.username = "";
          $scope.password = "";
          $location.path("/login");
        }
        else{
          $rootScope.Logged = true;
          $window.localStorage.setItem($scope.username,response.data);//response = token
          $location.path("/poi");
        }
    }, function errorCallback(response) {
      $location.path("/login.html"); 
    }); 
      
    }

    $rootScope.logOut = function(){
      $rootScope.Logged = false;
    }

    $scope.restorePass = function(){
        var userToRestore = document.getElementById("username").value;
        alert("please insert username to restore password");
        let serverUrl='http://localhost:3000/';
        var req = {
            method: 'GET',
            url: serverUrl + "getQuestions/",
            params: {user: userToRestore},
            }
            $http(req).then(function successCallback(response) {
                //show questions
                $window.location.href = "/"; 
              }, function errorCallback(response) {
                $window.location.href = "/"
              });
    }
     
 }]);