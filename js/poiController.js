angular.module('myApp').controller('poiController', ['$window', '$rootScope', '$scope','$http', 
function($window, $rootScope, $scope, $http) {
    let serverUrl='http://localhost:3000/';
    $scope.getCatPOI = function(category){
        $scope.detailsView = false;
        function successGetCatPOI(response){
            data = response.data;
            for (var i = 0; i < data.length; i++){
                data[i].POIName = data[i].POIName.replace(/\s*$/,'');
                data[i].CategoryName = "portfolio-item " + data[i].CategoryName.replace(/\s*$/,'') + " all col-xs-12 col-sm-4 col-md-3";
                data[i].Description = data[i].Description.replace(/\s*$/,'');
            }
            $scope.POIs = data;
        }
    
        function errorGetCatPOI(response){
            alert(response);
        }
    
        $http.get(serverUrl + 'GetCatPOI/' + category).then(successGetCatPOI, errorGetCatPOI);
    }
    
    $scope.getPOIInfo = function(poiName){
        
        function successGetCatPOI(response){
            data = response.data;
            data[0].POIName = data[0].POIName.replace(/\s*$/,'');
            data[0].CategoryName = data[0].CategoryName.replace(/\s*$/,'');
            data[0].Description = data[0].Description.replace(/\s*$/,'');

            $scope.POIs.POIName = data[0].POIName;
            $scope.POIs.Description = data[0].Description;
            $scope.POIs.Rank = "Rank: " + data[0].Rank;
            $scope.POIs.numOfViews = "Number of Viewers: " + data[0].NumOfViews;
            $scope.POIs.ImageURL = data[0].ImageURL;
            if (data.length > 1){
                $scope.POIs.Reviews = "";
                $scope.noReview = false;
                for (var i = 1; i < data.length; i++){
                    $scope.POIs.Reviews = $scope.POIs.Reviews + i + ". " + data[i].Review + '\n';
                }
            }
            else {
                $scope.noReview = true;
                $scope.POIs.Reviews = "No Reviews yet! Write your own review!";
            }
            
            $scope.detailsView = true;
        }
    
        function errorGetCatPOI(response){
            alert(response);
        }
    
        $http.get(serverUrl + 'getPOI_info/' + poiName).then(successGetCatPOI, errorGetCatPOI);
    }
    
    var req = {
        method: 'GET',
        url: serverUrl + 'private/user/getRecomendedPOI/' + $rootScope.loggedUser,
        headers: {
        'token': $window.localStorage.getItem($rootScope.loggedUser)
        },
            data: { "UserName": $rootScope.loggedUser}
        }
        

    function successGetRecommendedPOI(response){
        data = response.data;
        for (var i = 0; i < data.length; i++){
            data[i].POIName = data[i].POIName.replace(/\s*$/,'');
            data[i].CategoryName = "portfolio-item " + data[i].CategoryName.replace(/\s*$/,'') + " all col-xs-12 col-sm-4 col-md-3";
            data[i].Description = data[i].Description.replace(/\s*$/,'');
        }
        $scope.POIs = data;
    }

    function errorGetRecommendedPOI(response){
        alert(response);
    }

    $http(req).then(successGetRecommendedPOI, errorGetRecommendedPOI);

    var req2 = {
        method: 'GET',
        url: serverUrl + 'private/user/GetPOISaved/' + $rootScope.loggedUser,
        headers: {
        'token': $window.localStorage.getItem($rootScope.loggedUser)
        },
            data: { "UserName": $rootScope.loggedUser}
        }

    function successGetLast2SavedPOI(response){
        data = response.data;
        for (var i = 0; i < data.length; i++){
            data[i].POIName = data[i].POIName.replace(/\s*$/,'');
            data[i].CategoryName = "portfolio-item " + data[i].CategoryName.replace(/\s*$/,'') + " all col-xs-12 col-sm-4 col-md-3";
            data[i].Description = data[i].Description.replace(/\s*$/,'');
        }
        $scope.POI1 = data[0];
        $scope.POI2 = data[1];
    }

    function errorGetLast2SavedPOI(response){
        alert(response);
    }

    $http(req2).then(successGetLast2SavedPOI, errorGetLast2SavedPOI);

    $scope.savePOI = function(poiName){
        
        function successSavePOI(response){
            if (response.data == "success"){
                $window.alert("POI saved successfully!")
            }
            else if(response.data == "POI Already Saved"){
                $window.alert("POI already in your list!")
            }
            else{
                $window.alert(response.data)
            }

        }
    
        function errorSavePOI(response){
            alert(response);
        }
        $http.post(serverUrl + 'private/user/savePOI', { "UserName": $rootScope.loggedUser , "POIName": poiName }, {"headers": {
            'Content-Type': 'application/json' , "token": $window.localStorage.getItem($rootScope.loggedUser)}}).then(successSavePOI, errorSavePOI);
    }
    
 }]);