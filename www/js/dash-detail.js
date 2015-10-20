angular.module('starter.dash.detail', []).controller('DashDetailCtrl',
		function($scope, $stateParams, Solutions) {
			$scope.more = {
				'show' : true
			};
			$scope.less = {
				'show' : false
			};
			$scope.show_more = function() {
				$scope.more.show = !$scope.more.show;
				$scope.less = {
					'show' : true
				};
				more_less(true);
			};
			$scope.show_less = function() {
				$scope.less.show = !$scope.less.show;
				$scope.more = {
					'show' : true
				};
				more_less(false);
			};

			$scope.solution = Solutions.get({
				solnId : $stateParams.id
			});
			$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
				flexslider_show();
			});

		}).directive('onFinishRender', function($timeout) {
	return {
		restrict : 'A',
		link : function(scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function() {
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
		animation : "slide",
		animationLoop : false,
		directionNav : false,
		itemWidth : 210,
		itemWidth : 115,
		itemMargin : 5,
		move : 1,
		slideshow : true,
		minItems : getGridSize(), // use function to pull in initial value
		maxItems : getGridSize(), // use function to pull in initial value
		start : function(slider) {
			$('body').removeClass('loading');
			flexslider = slider;
		}
	});

	// check grid size on resize event
	$window.resize(function() {
		var gridSize = getGridSize();

		flexslider.vars.minItems = gridSize;
		flexslider.vars.maxItems = gridSize;
	});

}
// tiny helper function to add breakpoints
function getGridSize() {
	return (window.innerWidth < 600) ? 2 : (window.innerWidth < 900) ? 3 : 4;
}
