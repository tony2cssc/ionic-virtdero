angular.module('starter.services', ['ngResource'])

  .factory('Solutions', ['$resource', function($resource) {
    return $resource('https://stormy-refuge-7104.herokuapp.com/solutions/:solnId')
  }])
