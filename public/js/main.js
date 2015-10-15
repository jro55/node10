angular.module('countriesApp', [])

angular.module('countriesApp')
    .controller('countriesController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
        
        $scope.countriesArray = []
        $scope.load = function(){
            $http.get('/loadcountries')
            .then(function(returnData) {
                $scope.countriesArray = returnData.data
            })
        }
        
        $scope.search = function() {
            console.log($scope.whichCountry)
            $http.post('/searchforcountry', {
                       country : $scope.whichCountry
                       })
            .then(function(returnData) {
                $scope.countriesArray = returnData.data
            })
        }
        
        $scope.beenThere = function(name) {
            console.log(name)
//            countryObj.been = true;
            $http.post('/beentherecheck', {
                name : name
            })
            .then(function(returnData) {
                $scope.entryArray = returnData.data
            })
        }
        
        $scope.delete = function(name) {
            console.log(name)
            $http.post('/deleteapplicant', {
                name : name
            })
            .then(function(returnData) {
                console.log(returnData.data)
                $scope.entryArray = returnData.data
            })
        }
    
    
    
    }])




//$scope.delete = function(name) {
//            console.log(name)
//            $http.post('/deleteapplicant', {
//                name : name
//            })
//            .then(function(returnData) {
//                $scope.entryArray = returnData.data
//            })
//        }