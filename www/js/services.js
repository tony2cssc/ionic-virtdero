angular.module('starter.services', ['ngResource'])

  .factory('Solutions', ['$resource','$rootScope', function($resource,$rootScope) {
    //return $resource('https://tranquil-headland-5792.herokuapp.com/solutions/:solnId');
    return $resource($rootScope.url+'listSolutions.do');
  }])

  .factory('Solution', ['$resource','$rootScope', function($resource,$rootScope) {
    return $resource($rootScope.url+'getSolutionById.do?id=:id');
  }])
