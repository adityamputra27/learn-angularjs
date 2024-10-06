var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate'])

myNinjaApp.
  config(['$routeProvider', '$locationProvider',
    function config($routeProvider, $locationProvider) {
      $routeProvider.
        when('/home', {
          templateUrl: 'views/home.html',
          controller: 'NinjaController',
        }).
        when('/contact', {
          templateUrl: 'views/contact.html',
          controller: 'ContactController',
        }).
        when('/contact-success', {
          templateUrl: 'views/contact-success.html',
          controller: 'ContactController',
        }).
        when('/directory', {
          templateUrl: 'views/directory.html',
          controller: 'NinjaController',
        }).
        otherwise('/home');

      $locationProvider.html5Mode(true)
    }
  ]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function ($scope, $http) {
  $scope.addNinja = function () {
    $scope.ninjas.push({
      name: $scope.newninja.name,
      belt: $scope.newninja.belt,
      rate: parseInt($scope.newninja.rate),
      available: true,
    })

    $scope.newninja.name = ""
    $scope.newninja.belt = ""
    $scope.newninja.belt = ""
  }

  $http.get('data/ninjas.json').then(function (data) {
    $scope.ninjas = data.data
  })

  $scope.removeNinja = function(ninja) {
    var removedNinja = $scope.ninjas.indexOf(ninja)
    $scope.ninjas.splice(removedNinja, 1)
  }

  $scope.removeAll = function () {
    $scope.ninjas = []
  }
}])

myNinjaApp.directive('randomNinja', [function () {
  return {
    restrict: 'EA',
    scope: {
      ninjas: '=',
      title: '=',
    },
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,
    controller: function ($scope) {
      $scope.random = Math.floor(Math.random() * 3)
    }
  }
}])

myNinjaApp.controller('ContactController', ['$scope', '$location', function ($scope, $location) {
  $scope.sendMessage = function () {
    $location.path('/contact-success')
  }
}])

