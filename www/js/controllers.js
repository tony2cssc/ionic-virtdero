angular.module('starter.controllers', [])

  .controller('DashCtrl', ['$scope', 'Solutions','$rootScope',function ($scope, Solutions,$rootScope) {
	 var currentPlatform = ionic.Platform.platform();
	 $rootScope.currentPlatform = currentPlatform;
    $scope.solutions = Solutions.query();
  }])

  .controller('CategoriesCtrl', function ($scope) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })
  .controller('SearchCtrl', function ($scope) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });
  })

