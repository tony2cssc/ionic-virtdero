angular.module('starter.controllers', [])

  .controller('DashCtrl', ['$scope', 'Solutions',function ($scope, Solutions) {
    $scope.solutions = Solutions.query();
  }])

  .controller('DashDetailCtrl', function ($scope, $stateParams, Solutions) {
	  $scope.more = {'show':true};
	  $scope.less = {'show':false};
	   $scope.show_more = function () {
          $scope.more.show = !$scope.more.show;
		  $scope.less = {'show':true};
		  more_less(true);
        };
		 $scope.show_less = function () {
          $scope.less.show = !$scope.less.show;
		  $scope.more = {'show':true};
		  more_less(false);
        };
		
	 $scope.solution = Solutions.get({solnId: $stateParams.id});
	 flexslider_show();
  })
  
  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });


function more_less(flag){
	if(flag){
		document.getElementById('description').style.whiteSpace ="normal"
		}else{
			document.getElementById('description').style.whiteSpace ="nowrap"
			}
	
	}