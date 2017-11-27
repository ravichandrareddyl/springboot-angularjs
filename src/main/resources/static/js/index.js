angular
    .module('hello', [ 'ngRoute', 'toaster', 'auth' ,'home', 'navigation' ])
    .config(

        function($routeProvider, $httpProvider, $locationProvider ) {
          $locationProvider.html5Mode(true);
          
          $routeProvider.when('/', {
            templateUrl : 'js/home/home.html',
            controller : 'home',
            controllerAs: 'vm' 
          }).when('/login', {
            templateUrl : 'js/login/login.html',
            controller : 'navigation'
          }).otherwise('/');

          $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        })
        .run(function(auth) {
          auth.init('/', '/login', '/logout');
        });