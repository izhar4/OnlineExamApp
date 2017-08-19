var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider) {
     $locationProvider.hashPrefix('');
     
    $urlRouterProvider.otherwise('/login');
        
    $stateProvider.state('registration', {
            url: '/registration',
            templateUrl: '../registration.html',
            controller:'formCtrl'
            
        });

    $stateProvider.state('login', {
            url: '/login',
            templateUrl: '../userLogin.html',
            controller:'loginCtrl'
            
        });

    $stateProvider.state('userpage', {
            url: '/userPage',
            templateUrl: '../userPage.html',
            controller:'userCtrl'
            
        });

    $stateProvider.state('adminpage', {
            url: '/adminPage',
            templateUrl: '../adminPage.html',
            controller:'adminCtrl'
            
        });
    
    $stateProvider.state('resultpage', {
            url: '/resultPage',
            templateUrl: '../resultPage.html',
            controller:'resultCtrl'
            
        });

  /* $stateProvider.state("otherwise", {
        url: "*path",
        templateUrl: '../userLogin.html',
        controller:'loginCtrl'
    });*/

       
}]);
