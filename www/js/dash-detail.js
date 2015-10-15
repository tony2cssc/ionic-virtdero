
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
		// flexslider.vars.maxItems = gridSize;
	});

}
// tiny helper function to add breakpoints
function getGridSize() {
	return (window.innerWidth < 600) ? 2 : (window.innerWidth < 900) ? 3 : 4;
}
