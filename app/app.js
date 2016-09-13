var ngApp = angular.module('ngApp', ['ngRoute']);

ngApp.config(function($routeProvider) {
    $routeProvider

    .when('/data/:lat/:lng', {
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

        $scope.loading = true;


        $http.get("http://mrdata.usgs.gov/general/near-point.php?x="+$scope.lat+"&y="+$scope.lng+"&d=0.01&format=json")
        .then(function(response) {
            $scope.data = response.data;
            $scope.loading = false;
        });



    }
]);
