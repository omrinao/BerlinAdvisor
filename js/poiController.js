angular.module('myApp').controller('poiController', ['$scope','$http', function($scope, $http) {
    let serverUrl='http://localhost:3000/';

    

    function successGetQuestion(response){
        $scope.questions = response.data;
    }

    function errorGetQuestion(response){
        alert(response);
    }

    $http.get(serverUrl + 'getQuestions/omri').then(successGetQuestion, errorGetQuestion);


    function successGetCatPOI(response){
        data = response.data;
        for (var i = 0; i < data.length; i++){
            data[i].POIName = data[i].POIName.replace(/\s*$/,'');
            data[i].CategoryName = data[i].CategoryName.replace(/\s*$/,'');
            data[i].Description = data[i].Description.replace(/\s*$/,'');
        }
        $scope.poiByCat = data;
    }

    function errorGetCatPOI(response){
        alert(response);
    }

    $http.get(serverUrl + 'GetCatPOI/Sights').then(successGetCatPOI, errorGetCatPOI);

    function successGetRandomPOI(response){
        data = response.data;
        for (var i = 0; i < data.length; i++){
            data[i].POIName = data[i].POIName.replace(/\s*$/,'');
            data[i].CategoryName = "portfolio-item " + data[i].CategoryName.replace(/\s*$/,'') + " all col-xs-12 col-sm-4 col-md-3";
            data[i].Description = data[i].Description.replace(/\s*$/,'');
        }
        $scope.randomPOI = data;
    }

    function errorGetRandomPOI(response){
        alert(response);
    }

    $http.get(serverUrl + 'GetRandomPOI/0').then(successGetRandomPOI, errorGetRandomPOI);
 }]);