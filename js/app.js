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

    $scope.$watch('countryName',function() {
        if (typeof $scope.countryName != 'undefined') {

            $http.get("https://restcountries.eu/rest/v1/name/" + $scope.countryName)
                .then(function (response) {
                    $scope.details = response.data;
                });
            if (document.querySelector('[name="searchCountry"]').value == "")
                $scope.details = undefined;

        }
    });

    $scope.$watch('inRegion',function(){

        $http.get("https://restcountries.eu/rest/v1/region/" + $scope.inRegion)
            .then(function (response) {
                $scope.details = response.data;
            });
        if(document.querySelector('[name="regions"]').value=="")
            $scope.details = undefined;
    });


 /*   $scope.$watch('currencyUsedByCountries',function(){
        if(typeof $scope.currencyUsedByCountries != 'undefined') {
            $http.get("https://restcountries.eu/rest/v1/currency/" + $scope.currencyUsedByCountries)
                .then(function (response) {
                    $scope.details = response.data;

                });
            if (document.querySelector('[name="searchCurrency"]').value == "")
                $scope.details = undefined;

        }
    });*/
  //  watchElements("currencyUsedByCountries","currency","searchCurrency");
  //  watchElements("inRegion","region","regions");
    console.log($scope);
      watchElements("countryName","name","searchCountry",$scope,$http);
});


function watchElements(target,type,name,scope,http){

    scope.$watch(target,function(){
        if(typeof scope[target] != 'undefined') {
            http.get("https://restcountries.eu/rest/v1/" + type + "/"+ scope[target])
                .then(function (response) {
                    scope.details = response.data;
                });
            if (document.querySelector('[name='+name+']').value == "")
                scope.details = undefined;

        }
    })
}

listCountries.controller('EditController',function($scope){

});