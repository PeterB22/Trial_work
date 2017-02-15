var listCountries = angular.module('CountryList',['ngRoute']);

listCountries.config(function($routeProvider){
   $routeProvider
       .when("/",{
           templateUrl : 'pages/home.html',
           controller : 'HomeController'
       })
       .when("/list",{
           templateUrl : 'pages/list.html',
           controller : 'ListController'
       })
       .when("/edit",{
           templateUrl : 'pages/edit.html',
           controller : 'EditController'
       })

       .otherwise({redirectTo : "/"});

});


listCountries.controller('MainController',function($scope){

});

listCountries.controller('HomeController',function($scope){

});

listCountries.controller('ListController',function($scope,$http){
    $scope.$watch('search',function(){
        if(typeof $scope.search != 'undefined') {
            $http.get("https://restcountries.eu/rest/v1/name/" + $scope.search)
                .then(function (response) {
                    $scope.details = response.data;
                    console.log($scope.details);
                })
        }
    });

    $scope.update = function(country){
        $scope.search = country.name;
    };

    $scope.select = function(){
        this.setSelectionRange(0,this.value.length);
    }
});

listCountries.controller('EditController',function($scope){

});