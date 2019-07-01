angular.module('myApp').controller('poiController', ['$window', '$rootScope', '$scope','$http', 
function($window, $rootScope, $scope, $http) {
    let serverUrl='http://localhost:3000/';
    $scope.noPOiSaved = true;
    $scope.detailsView = false;
    $rootScope.SavedPOI = new Array();

    /**
     * function for saved POI
     */
    var req3 = {
        method: 'GET',
        url: serverUrl + 'private/user/GetPOISaved/' + $rootScope.loggedUser,
        headers: {
        'token': $window.localStorage.getItem($rootScope.loggedUser)
        },
            data: { "UserName": $rootScope.loggedUser}
        }
    $http(req3).then(successSavedPOI, errorGetSavedPOI);

    function successSavedPOI (response){
        $rootScope.NumOfSavedPOIs = response.data.length
        for (var i = 0; i < response.data.length; i++){
            $rootScope.SavedPOI[i] = response.data[i].POIName.replace(/\s*$/,'');
        }
    }

    function errorGetSavedPOI (response){
        alert(response.data)
    }

    /**
     * function that check if a given poi is in then users favorite POI
     */
    $scope.inSavedPOI = function(poiName){
        for (var i = 0; i < $rootScope.SavedPOI.length; i++){
            if ($rootScope.SavedPOI[i] == poiName){
                return true;
            }
        }
        return false;
    }


    $scope.display_review_page = function(poiName){
        // Get the modal
        var modal = document.getElementById('myModal');
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        document.getElementById("poiNameText").innerHTML = poiName;
        document.getElementById("reviewText").innerHTML = "";
        var btn = document.getElementById("reviewBtn");
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("reviewText").value = "";
        }

        // Handle ESC key (key code 27)
        document.addEventListener('keyup', function(e) {
            if (e.keyCode == 27) {
                modal.style.display = "none";
                document.getElementById("reviewText").value = "";
            }
        });

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("reviewText").value = "";
        }
        }

        btn.onclick = function(){
            function successReviewPOI(response){
                if (response.data == "success"){
                    $window.alert("Review saved successfully!")
                    modal.style.display = "none";
                    document.getElementById("reviewText").value = "";
                }
                else{
                    $window.alert(response.data)
                    modal.style.display = "none";
                    document.getElementById("reviewText").value = "";
                }
    
            }
        
            function errorReviewPOI(response){
                alert(response);
            }
            var rnk = document.getElementById("OutputId").value;
            $http.post(serverUrl + 'private/user/SaveUsersReview', { "UserName": $rootScope.loggedUser , "Rank": rnk , "Description": $scope.rRev, "POIName": poiName}, 
            {"headers": {'Content-Type': 'application/json' , "token": $window.localStorage.getItem($rootScope.loggedUser)}}).then(successReviewPOI, errorReviewPOI);
        }
    }


    /**
     * function for POI by category
     */
    $scope.getCatPOI = function(category){
        $scope.detailsView = false;
        function successGetCatPOI(response){
            var catArr = [];
            for (var i=0; i < response.data.length; i++){
                if (!catArr.includes(response.data[i].CategoryName)){
                    catArr.push(response.data[i].CategoryName)
                }
            }
            catArr.sort();
            data = response.data;
            var tmpData = []
            var index = 0;
            for (var i = 0; i < catArr.length; i++){
                for (var j = 0 ; j < data.length; j++){
                    if (data[j].CategoryName === catArr[i]){
                       tmpData[index] = data[j]
                       index++
                    }
                }
            }
            for (var i =0; i < tmpData.length; i++){
                data[i] = tmpData[i]
            }
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
    

    /**
     * function for getting POI details
     */
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
                        $scope.POIs.Reviews = $scope.POIs.Reviews + i + ". " + data[i].Review + "   -   Published at: " + data[i].Date;
                        $scope.POIs.Reviews = $scope.POIs.Reviews.substring(0, $scope.POIs.Reviews.length - 14) + "     ";
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


    /**
     * function for recommended POI
     */
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


    
    /**
     * function for last 2 POI saved
     */
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
        if (data.length == 0){
            $scope.noPOiSaved = false;
        }
        else{
            for (var i = 0; i < data.length; i++){
                data[i].POIName = data[i].POIName.replace(/\s*$/,'');
                data[i].CategoryName = "portfolio-item " + data[i].CategoryName.replace(/\s*$/,'') + " all col-xs-12 col-sm-4 col-md-3";
                data[i].Description = data[i].Description.replace(/\s*$/,'');
            }
            $scope.POI1 = data[data.length-1];
            $scope.POI2 = data[data.length-2];
            $scope.noPOiSaved = true;
            
        }
    }

    function errorGetLast2SavedPOI(response){
        alert(response);
    }

    $http(req2).then(successGetLast2SavedPOI, errorGetLast2SavedPOI);


    /**
     * function for saving a POI
     */
    $scope.savePOI = function(poiName){
        
        function successSavePOI(response){
            if (response.data == "success"){
                $window.alert("POI saved successfully!")
                $rootScope.NumOfSavedPOIs++
                $rootScope.SavedPOI.push(poiName)
                var req2 = {
                    method: 'GET',
                    url: serverUrl + 'private/user/GetPOISaved/' + $rootScope.loggedUser,
                    headers: {
                    'token': $window.localStorage.getItem($rootScope.loggedUser)
                    },
                        data: { "UserName": $rootScope.loggedUser}
                    }
                    $http(req2).then(successGetLast2SavedPOI, errorGetLast2SavedPOI);
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
        var timeStamp = + new Date();
        $http.post(serverUrl + 'private/user/savePOI', { "UserName": $rootScope.loggedUser , "POIName": poiName, "TimeStamp": timeStamp}, {"headers": {
            'Content-Type': 'application/json' , "token": $window.localStorage.getItem($rootScope.loggedUser)}}).then(successSavePOI, errorSavePOI);
    }


    /**
     * 
     */
    $scope.openSearchBox = function(){
        var poiName = prompt("Please enter the name of the point you want to find:", "");
        if (poiName == null || poiName == "") {
            alert("no name entered")
        } else {
            $http.get(serverUrl + 'getPOI_info/' + poiName).then(successSearchPOI, errorSearchPOI);
        }

        function successSearchPOI(response){
            if (response.data === "No such POI"){
                alert(response.data)
            }else{
                var catArr = [];
            for (var i=0; i < response.data.length; i++){
                if (!catArr.includes(response.data[i].CategoryName)){
                    catArr.push(response.data[i].CategoryName)
                }
            }
            catArr.sort();
            data = response.data;
            var tmpData = []
            var index = 0;
            for (var i = 0; i < catArr.length; i++){
                for (var j = 0 ; j < data.length; j++){
                    if (data[j].CategoryName === catArr[i]){
                       tmpData[index] = data[j]
                       index++
                    }
                }
            }
            for (var i =0; i < tmpData.length; i++){
                data[i] = tmpData[i]
            }
            for (var i = 0; i < data.length; i++){
                data[i].POIName = data[i].POIName.replace(/\s*$/,'');
                data[i].CategoryName = "portfolio-item " + data[i].CategoryName.replace(/\s*$/,'') + " all col-xs-12 col-sm-4 col-md-3";
                data[i].Description = data[i].Description.replace(/\s*$/,'');
            }
            $scope.POIs = data;
            }
        }
    
        function errorSearchPOI(response){
            alert(response);
        }
    }
    

    $scope.removeFromList = function(poiName){
        
        function errorRemovePOI(response){
            alert(response);
          }
        
          function successRemovePOI(response){
             for (var i = 0; i < $rootScope.SavedPOI.length; i++){
                 if ($rootScope.SavedPOI[i] == poiName)
                 {
                    $rootScope.SavedPOI[i] = "none"
                    $rootScope.NumOfSavedPOIs--;
                    $window.alert("POI Removed From Your List")
                 }
             }
          }
        
        var req = {
          method: 'POST',
          url: serverUrl + 'private/user/RemovePOI',
          headers: {
          'token': $window.localStorage.getItem($rootScope.loggedUser)
          },
              data: { "UserName": $rootScope.loggedUser, "POIName" : poiName}
          }
          $http(req).then(successRemovePOI, errorRemovePOI);
      }
 }]);