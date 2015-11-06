angular.module('starter.dash.detail', ['ngCordova']).controller('DashDetailCtrl',
  function ($scope, $stateParams, Solutions, $timeout, $cordovaFileTransfer, $ionicLoading, $cordovaFileOpener2, $rootScope) {
    $scope.more = {
      'show': true
    };
    $scope.less = {
      'show': false
    };
    $scope.show_more = function () {
      $scope.more.show = !$scope.more.show;
      $scope.less = {
        'show': true
      };
      more_less(true);
    };
    $scope.show_less = function () {
      $scope.less.show = !$scope.less.show;
      $scope.more = {
        'show': true
      };
      more_less(false);
    };

    $scope.solution = Solutions.get({
      solnId: $stateParams.id
    });
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
      flexslider_show();
    });

    $scope.download_file = function (url, event) {
      //window.open(url,'_self');
      //window.location = url;
      //location.href=target;

      /* example for file-transfer  plugin*/
      document.addEventListener('deviceready', function () {
        var directory = cordova.file.documentsDirectory;
        if ($rootScope.currentPlatform == 'android') {
          directory = cordova.file.externalRootDirectory;
        }
        var file_name = url.substr(url.lastIndexOf('/') + 1);
        var targetPath = directory + file_name;

        var trustHosts = true;
        var options = {encodeURI: false};
        $ionicLoading.show({
          template: 'Downloding...'
        })

        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
          .then(function (result) {
            // Success!
            var type = "application/pdf";
            if ((targetPath.toLowerCase()).indexOf('.mp4') > 0) {
              type = "video/mp4";
            }
            $cordovaFileOpener2.open(
              decodeURI(targetPath),
              type
            ).then(function () {
                // file opened successfully
                console.log(' file opened successfully');
              }, function (e) {
                // An error occurred. Show a message to the user
                alert('Error status: ' + e.status + ' - Error message: ' + e.message);
              });

          }, function (error) {
            // Error
            alert('source ' + error.source + " target " + error.target + " code " + error.code + " http_status " + error.http_status);
          }, function (progress) {
            $timeout(function () {
              $ionicLoading.hide();
              //  if(event.target.innerHTML != "100%"){
              // event.target.innerHTML = parseInt((progress.loaded / progress.total) * 100) + "%";
              // }
            })
          });
      }, false);
    };

    $scope.download_videos = function (url) {
      window.open(url, "_system", "location=yes,enableViewportScale=yes,hidden=no");
      //window.open(url,'_self');
    }

    $scope.download_apk = function (url) {
      /*     alert("download_apk");

       /!* example for local-notifications  plugin*!/
       document.addEventListener('deviceready', function () {
       $cordovaLocalNotification.schedule({
       id: 1,
       title: 'Title here111',
       text: 'Text here1111',
       at: new Date()
       // every:'second'
       // led: "FF0000"
       }).then(function (result) {
       // ...
       alert('$cordovaLocalNotification.schedule');
       });


       }, false);*/
      // window.open(url,"_system","location=yes,enableViewportScale=yes,hidden=no");

    }
  }).directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit(attr.onFinishRender);
          });
        }
      }
    }
  });

function more_less(flag) {
  if (flag) {
    document.getElementById('description').style.whiteSpace = "normal"
  } else {
    document.getElementById('description').style.whiteSpace = "nowrap"
  }

}

function flexslider_show() {
  var $window = $(window), flexslider;

  $('.flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    directionNav: false,
    itemWidth: 210,
    itemWidth: 115,
    itemMargin: 5,
    move: 1,
    slideshow: true,
    minItems: getGridSize(), // use function to pull in initial value
    maxItems: getGridSize(), // use function to pull in initial value
    start: function (slider) {
      $('body').removeClass('loading');
      flexslider = slider;
    }
  });

  // check grid size on resize event
  $window.resize(function () {
    var gridSize = getGridSize();

    flexslider.vars.minItems = gridSize;
    flexslider.vars.maxItems = gridSize;
  });

}
// tiny helper function to add breakpoints
function getGridSize() {
  return (window.innerWidth < 600) ? 2 : (window.innerWidth < 900) ? 3 : 4;
}
