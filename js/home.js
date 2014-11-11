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

var colors = ["#00C4B3", "#F7323F", "#F9BE00"];
$(".js-arc").click(function(){
	colors.push(colors.shift());
	$(".js-arc path").each(function(i){
		$(this).attr("fill", colors[i]);
	})
});



$(document).ready(function(){

	function Ball(translateX, translateY, rotation){
		this.translateX = -180;
		this.translateX = translateX;
		this.translateY = translateY;
		this.rotation = rotation;
		this.gravity = 0.075;
		this.vy = 0;
	}

	balls = [];

	$(".js-circle").each(function(i){
		balls.push(new Ball(-180 + i * 175, 0, i*60))
	});

	function animate(){
		window.requestAnimationFrame(animate);

		for (var i = 0 ; i < balls.length ; i++){
			balls[i].translateX += 1.5;
			balls[i].rotation += 2;
			if (balls[i].translateX > 220){
				balls[i].vy+=balls[i].gravity;
				balls[i].translateY+=balls[i].vy;
			}
			if (balls[i].translateY > 310){
				balls[i].translateX = -180;
				balls[i].translateY = 0;
				balls[i].vy = 0;
			}

			$(".js-circle").eq(i).css("transform", "translateX("+balls[i].translateX+"px) translateY("+balls[i].translateY+"px) rotate("+balls[i].rotation+"deg)");

		}

	}

	animate();
})