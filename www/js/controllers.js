angular.module('starter.controllers', [])

  .controller('DashCtrl', ['$scope', 'Solutions','$rootScope','$cordovaDialogs', function ($scope, Solutions,$rootScope, $cordovaDialogs) {
    $scope.solutions = Solutions.query();
    $scope.doRefresh = function(){
      $scope.solutions = Solutions.query(function(){
        $scope.$broadcast('scroll.refreshComplete');
      })
    }
    $scope.download_apk = function (platforms,currentPlatform) {
      download(platforms,currentPlatform,$rootScope,$cordovaDialogs);
    }
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

    $scope.searching = [{"item": ""}];
    $scope.clearSearch = function () {
      $scope.searching.item = '';
    };
  })

// download apk
function download(platforms,currentPlatform,$rootScope,$cordovaDialogs){
  var flag = true;
  var platformsStr = "";
  for(var i =0;i <platforms.length;i++){
    platformsStr =platformsStr+ platforms[i].name+",";
    if(platforms[i].name.toLowerCase().trim() == currentPlatform){
      flag = false;
      window.open($rootScope.url+platforms[i].url, "_system", "location=yes,enableViewportScale=yes,hidden=no");
    }
  }

  if(flag){
    var message ='The platform is not support,only support '+platformsStr+' do you want continue to download ?';
    $cordovaDialogs.confirm(message, 'title', ['OK','Cancel'])
      .then(function(buttonIndex) {
        // no button = 0, 'OK' = 1, 'Cancel' = 2
        var btnIndex = buttonIndex;
        if(btnIndex == 1){
          //download
          window.open($rootScope.url+platforms[0].url, "_system", "location=yes,enableViewportScale=yes,hidden=no");
        }
      });

  }
}
