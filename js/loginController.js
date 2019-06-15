angular.module('myApp').controller('loginController', ['$location', '$window', '$scope','$http', 
function($location, $window, $scope, $http) {
    
    $scope.tryLogin = function(){
        var user = document.getElementById("username").value;
        var pass = document.getElementById("password").value;
        let serverUrl='http://localhost:3000/';
        /*
        function successTryLogin(response){
          if (response == "Wrong User Name Or Password"){
            $location.path("../pages/constIndex.html");
          }
          else{
            $window.LocalStorage.setItem(user,response);//response = token
            $location.path("../pages/constIndex.html");
          }
        }
      
        function errorTryLogin(response){
          $location.path("../pages/constIndex.html"); 
        }
            
        $http.post(serverUrl + "login", { UserName: user , Password: pass }, {headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
      }}).then(successTryLogin, errorTryLogin);
*/
      var req = {
        method: 'POST',
        url: serverUrl + "login",
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
        },
          data: { UserName: user , Password: pass }
        }
        $http(req).then(function successCallback(response) {
          if (response == "Wrong User Name Or Password"){
            $location.path("../pages/constIndex.html");
          }
          else{
            $window.LocalStorage.setItem(user,response);//response = token
            $location.path("../pages/constIndex.html");
          }
      }, function errorCallback(response) {
        $location.path("../pages/constIndex.html"); 
      });
    
 
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