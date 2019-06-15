angular.module('myApp').controller('poiController', ['$scope','$http', function($scope, $http) {
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
    
    function successGetRandomPOI(response){
        data = response.data;
        for (var i = 0; i < data.length; i++){
            data[i].POIName = data[i].POIName.replace(/\s*$/,'');
            data[i].CategoryName = "portfolio-item " + data[i].CategoryName.replace(/\s*$/,'') + " all col-xs-12 col-sm-4 col-md-3";
            data[i].Description = data[i].Description.replace(/\s*$/,'');
        }
        $scope.POIs = data;
    }

    function errorGetRandomPOI(response){
        alert(response);
    }

    $http.get(serverUrl + 'GetRandomPOI/0').then(successGetRandomPOI, errorGetRandomPOI);
    
 }]);