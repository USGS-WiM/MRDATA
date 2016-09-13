var ngApp = angular.module('ngApp', ['ngRoute']);
// var ngApp = angular.module('ngApp', ['ngRoute', 'leaflet-directive']);

ngApp.config(function($routeProvider) {
    $routeProvider

    .when('/data/:lat/:lng/', {
        templateUrl : 'pages/data.html',
        controller  : 'dataController'
    })
    .otherwise({
        redirectTo: "/data/-109.14062/46.01222/"
    });
    // .when('/other', {
    //     templateUrl : 'pages/other.html',
    //     controller  : 'otherController'
    // })

});



ngApp.controller('dataController', ['$scope', '$window', '$rootScope', '$route', '$routeParams', '$timeout', '$http',
    function($scope, $window, $rootScope, $route, $routeParams, $timeout, $http){

        $scope.lat = $routeParams.lat;
        $scope.lng = $routeParams.lng;

        $scope.test = function(){
            alert("AYxxxxxEE");
        }

        $scope.narrower = function(){
            console.log("Getting narrower");
            $scope.tolerance = $scope.tolerance / 2;
            $scope.eastwest = $scope.eastwest / 2;
            $scope.northsouth = $scope.northsouth / 2;
            $scope.loading = true;
            $scope.changeView();
        }
        $scope.wider = function(){
            console.log("Getting wider");
            $scope.tolerance = $scope.tolerance * 2;
            $scope.eastwest = $scope.eastwest * 2;
            $scope.northsouth = $scope.northsouth * 2;
            $scope.loading = true;
            $scope.changeView();
        }

        $scope.loading = true;

        $scope.tolerance = 0.01;
        $scope.eastwest = 2.2;
        $scope.northsouth = 3.2;


        $http.get("http://mrdata.usgs.gov/general/near-point.php?x="+$scope.lat+"&y="+$scope.lng+"&d=0.01&format=json")
        .then(function(response) {
            console.log("data loaded")
            $scope.data = response.data;
            $scope.loading = false;
        });






        $scope.changeView = function(){
            console.log("Updating");
            $http.get("http://mrdata.usgs.gov/general/near-point.php?x="+$scope.lat+"&y="+$scope.lng+"&d="+$scope.tolderance+"&format=json")
            .then(function(response) {
                $scope.data = response.data;
                $scope.loading = false;
            });
        }











    }
]);
