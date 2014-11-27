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
		this.gravity = 0.18;
		this.gravity = 0.6;
		this.vy = 0;
	}

	balls = [];

	$(".js-circle").each(function(i){
		balls.push(new Ball(-180 + i * 175, 0, i*60))
	});

	function animate(){
		window.requestAnimationFrame(animate);

		for (var i = 0 ; i < balls.length ; i++){
			balls[i].translateX += 2.5;
			balls[i].rotation += 3;
			if (balls[i].translateX > 235){
				balls[i].vy+=balls[i].gravity;
				balls[i].translateY+=balls[i].vy;
			}
			if (balls[i].translateY > 310){
				balls[i].translateX = -180;
				balls[i].translateY = 0;
				balls[i].vy = 0;
			}

			// $(".js-circle").eq(i).css("transform", "translateX("+balls[i].translateX+"px) translateY("+balls[i].translateY+"px) rotate("+balls[i].rotation+"deg)");
			$(".js-circle").eq(i).attr("transform", "translate("+balls[i].translateX+" "+balls[i].translateY+") rotate("+balls[i].rotation+" 138.8 329.292)");

		}

	}

	animate();



	//	Set up Pong

	var pong;
	$('.js-pong-trigger').on('click', function(e) {
		e.preventDefault();
		$('<canvas id="pong"></canvas>').appendTo('body').fadeIn(100);
		$('<p id="score">0</p>').appendTo('body');
		pong = new Pong('pong', { 
			ball_color: 'rgb(247,50,63)',
			ball_size: 24,
			ball_x: $(this).offset().left + 30,
			ball_y: $(this).offset().top - $(window).scrollTop(),
			sudden_death: true,
			gameOver: function(score) {
				$('#score').fadeOut(600, function() {
					$(this).remove();
				});
				$('#pong').fadeOut(600, function() {
					$(this).remove();
				});
				$('<div id="pong-final-score"><p>Score: ' + score + '</p></div>').appendTo('body').fadeIn(600, function() {
					destroyPong();
					$(this).delay(1500).fadeOut(1000, function() {
						$(this).remove();
					});
				});
			}
		});
		setTimeout(function() {
			pong.animate(); 
		}, 20);
	});
	
	function destroyPong() {
		pong = false;
	}
});



var Pong = function(element_id, opts) {
	
	var canvas = document.getElementById(element_id),
		ctx = canvas.getContext('2d'),
		w = $(window).width(),
		h = $(window).height(),
		playing = false;
		score = 0;
	
	canvas.width = w;
	canvas.height = h;
		
	var ball = {
		x: opts.ball_x,
		y: opts.ball_y,
		r: opts.ball_size / 2,
		c: opts.ball_color,
		velx: 3,
		vely: -3,
		draw: function() {
			ctx.beginPath();
			ctx.fillStyle = this.c;
			ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
			ctx.fill();
		},
		update: function() {
			if (this.x + this.velx + this.r >= w || this.x + this.velx - this.r < 0) {
				this.velx = this.velx * -1;
			}
			if (this.y + this.vely + this.r >= paddle.y 
					&& this.x > paddle.x 
					&& this.x < paddle.x + paddle.width) {
				this.vely = this.vely * -1;
				if (this.velx < 15 && this.velx > -15) {
					this.velx = this.velx * 1.2;
					this.vely = this.vely * 1.2;
				}
				updateScore(Math.abs(Math.round(this.velx)));
			}
			else if (this.y + this.vely + this.r >= h || this.y + this.vely - this.r < 0) {
				if (this.y + this.vely + this.r >= h) {
					if (opts.sudden_death) {
						gameOver();
					}
					else {
						updateScore(-10);
					}
				}
				this.vely = this.vely * -1;
			}
			this.x += Math.round(this.velx);
			this.y += Math.round(this.vely);
		}
	};
	
	var paddle = {
		x: w / 2,
		y: h - 20,
		width: Math.min(w / 5, 70),
		height: 14,
		draw: function() {
			ctx.fillStyle = opts.ball_color; 
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	};
	
	var prepare = function() {
		ctx.clearRect(0, 0, w, h);
	};
	
	var draw = function() {
		prepare();
		ball.update();
		ball.draw();
		paddle.draw();
	};
	
	var anim = function() {
		if (playing) {
			requestAnimFrame(anim);
			draw();
		}
	};
	
	this.animate = function() {
		playing = true;
		anim();
		$(document).mousemove(function(e) {
			paddle.x = e.pageX - (paddle.width / 2);
		}); 
		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
			var touch = e.touches[0];
			paddle.x = touch.pageX - (paddle.width / 2);
		}); 
	}
	
	var updateScore = function(increment) {
		var old_score = score;
		score += increment;
		_animateUpdateScore(old_score);
	} 
	
	var _animateUpdateScore = function(score_now) {
		if (score_now !== score) {
			if (score_now < score) {
				score_now ++;
			}
			else {
				score_now --;
			}
			$('#score').text(score_now);
			requestAnimFrame(function() {_animateUpdateScore(score_now); });
		}
	}
	
	var pause = function() {
		playing = false;
	}
	
	var gameOver = function() {
		pause();
		if (typeof opts.gameOver === 'function') {
			opts.gameOver(score);
		}
	}
};


window.requestAnimFrame = (function() { 
	return window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame || 
	window.oRequestAnimationFrame || 
	window.msRequestAnimationFrame ||
	function(callback) { 
		return window.setTimeout(callback, 1000 / 60); 
	}; 
})();
