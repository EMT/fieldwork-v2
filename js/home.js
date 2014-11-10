$( document ).on( "mousemove", function( event ) {

	var mousePosition = {};
	mousePosition.x = event.pageX;
	mousePosition.y = event.pageY;

	$(".eye").each(function(index,element){
		eyePosition = $(this).offset();
		angle = Math.atan2(mousePosition.y - eyePosition.top, mousePosition.x - eyePosition.left);
		translateX = 10 * Math.cos(angle);
		translateY = 10 * Math.sin(angle);
		$(this).attr("transform", "translate("+ translateX +" "+ translateY+")");

	});

});

$(".js-pipe").click(function(){
	if (!$(this).data("up")){
		$(this).css("transform", "translate(0, -40px)");
		$(this).data("up", true);
	} else {
		$(this).css("transform", "translate(0, 0px)");
		$(this).data("up", false);
	}
});