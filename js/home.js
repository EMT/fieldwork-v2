/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-svg
 */
;window.Modernizr=function(a,b,c){function u(a){i.cssText=a}function v(a,b){return u(prefixes.join(a+";")+(b||""))}function w(a,b){return typeof a===b}function x(a,b){return!!~(""+a).indexOf(b)}function y(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:w(f,"function")?f.bind(d||b):f}return!1}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l={svg:"http://www.w3.org/2000/svg"},m={},n={},o={},p=[],q=p.slice,r,s={}.hasOwnProperty,t;!w(s,"undefined")&&!w(s.call,"undefined")?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e}),m.svg=function(){return!!b.createElementNS&&!!b.createElementNS(l.svg,"svg").createSVGRect};for(var z in m)t(m,z)&&(r=z.toLowerCase(),e[r]=m[z](),p.push((e[r]?"":"no-")+r));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)t(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},u(""),h=j=null,e._version=d,e}(this,this.document);

if (!Modernizr.svg){
	$(".js-home-illustration-fallback").css("display", "block");
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

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

			$(".js-circle").eq(i).attr("transform", "translate("+balls[i].translateX+" "+balls[i].translateY+")");
			$(".js-circle .inner-circle").eq(i).attr("transform", "rotate("+balls[i].rotation+" 138.8 329.292)");

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


	$(window).on('resize', function() {
 		sizeHeader();
 	});
 	sizeHeader();


 	// Grab and render blog post previews
 	var success = function(data) {
 		var html = '', 
 			d,
 			monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 		
 		for (var i = 0, len = Math.min(data.length, 4); i < len; i ++) {
 			d = data[i].date.split(' ');
 			d[0] = d[0].split('-');
 			d[1] = d[1].split(':');
 			d = new Date(d[0][0], d[0][1] - 1, d[0][2], d[1][0], d[1][1], d[1][2]);

 			html += '<li class="grid-item grid-item-4-1">'
     				+ '<ul class="category-icons">';

     				for (var ci = 0, clen = data[i].categories.length; ci < clen; ci ++) {
                    	html += '<li data-tooltip="' + convertToSlug(data[i].categories[ci]) + '" class="' + convertToSlug(data[i].categories[ci]) + '"><a class="tag" href="http://beta.madebyfieldwork.com/emt/category/' + convertToSlug(data[i].categories[ci]) + '/"></a></li>';
                    }

                	html += '</ul>'
                	+ '<a href="' + data[i].permalink + '">'
                    	+ '<h2>' + data[i].title + '</h2>'
                    	+ '<ul class="post-meta">'
	                        + '<li>' + d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear() + '</li>'
	                        + '<li>Posted by ' + data[i].author + '</li>'
                    	+ '</ul>'
                    	+ '<p class="post-excerpt">' + data[i].excerpt + '</p>'
                    	+ '<p class="post-more">Read more →</p>'
                	+ '</a>'
                + '</li>';
 		}

 		$('#home-page-blog').html(html);
 	}

 	var error = function(data) {
 		$('#home-page-blog').html('<li class="grid-item grid-item-2-1"><p>Oh no, blog posts aren’t loading right now. <a href="/emt">Go straight to the journal instead</a>.</p></li>');
 	}

	$.ajax({
		url: 'http://madebyfieldwork.com/emt/feed/json',
		success: success,
		error: error,
		dataType: 'json'
	});


	// Get latest tweet
	fetchTweet();


	// Get instagram

	var feed = new Instafeed({
        get: 'user',
        userId: 241671893,
        accessToken: '200182.467ede5.5276d701686b4539b066751f86a71d0f',
        resolution: 'standard_resolution',
        limit: 1,
        mock: true,
        success: function(data) {
			var url = data.data[0].images.standard_resolution.url,
				caption = data.data[0].caption.text;
			$('#instagramImage').css({backgroundImage: 'url(' + url + ')'});
			$('#instagramCaption').html(caption);
        }
    });
    feed.run();


    // Get LastFM
    
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=madebyfieldwork&api_key=c2e262a8a2491ca51184a5798afd5c4e&limit=5&format=json', function(data) {
// console.log(data);
		if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length) {
			artistVal = data.recenttracks.track[0].artist["#text"],
			trackVal = data.recenttracks.track[0].name;
			$('#now-playing').html('Now playing: <br />' + trackVal + ' by ' + artistVal);
		}
	});

});


function sizeHeader() {
	var $introText = $('.js-home-page-intro'),
		header_height = $('#site-header').innerHeight(),
		extra_height = $(window).innerHeight() - $('#svg-wrapper').innerHeight(),
		intro_text_height = $introText.innerHeight(),
		min_intro_text_spacing = 120;

	if (extra_height < intro_text_height + header_height + min_intro_text_spacing) {
		extra_height = intro_text_height + header_height + min_intro_text_spacing;
	}
	
	$('#homepage-header').css({paddingTop: extra_height + 'px'});
	$('.js-home-page-intro').css({bottom: (((extra_height - intro_text_height - header_height) / 2)) + 'px'});
}

function convertToSlug(string) {
    return string.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
}

function fetchTweet() {
	var config = {
	  "id": '509725445344878593',
	  "domId": 'latest-tweet',
	  "maxTweets": 1,
	  "enableLinks": true,
	  "showTime": false,
	  "showInteraction": false,
	  "showUser": false
	};
	twitterFetcher.fetch(config);
}

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


(function(){var e,t;e=function(){function e(e,t){var n,r;this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1};if(typeof e=="object")for(n in e)r=e[n],this.options[n]=r;this.context=t!=null?t:this,this.unique=this._genKey()}return e.prototype.hasNext=function(){return typeof this.context.nextUrl=="string"&&this.context.nextUrl.length>0},e.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},e.prototype.run=function(t){var n,r,i;if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");return this.options.before!=null&&typeof this.options.before=="function"&&this.options.before.call(this),typeof document!="undefined"&&document!==null&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=t||this._buildUrl(),n=document.getElementsByTagName("head"),n[0].appendChild(i),r="instafeedCache"+this.unique,window[r]=new e(this.options,this),window[r].unique=this.unique),!0},e.prototype.parse=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S;if(typeof e!="object"){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e),this.context.nextUrl="",e.pagination!=null&&(this.context.nextUrl=e.pagination.next_url);if(this.options.sortBy!=="none"){this.options.sortBy==="random"?d=["","random"]:d=this.options.sortBy.split("-"),p=d[0]==="least"?!0:!1;switch(d[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",p);break;case"liked":e.data=this._sortBy(e.data,"likes.count",p);break;case"commented":e.data=this._sortBy(e.data,"comments.count",p);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){a=e.data,this.options.limit!=null&&a.length>this.options.limit&&(a=a.slice(0,this.options.limit+1||9e9)),n=document.createDocumentFragment(),this.options.filter!=null&&typeof this.options.filter=="function"&&(a=this._filter(a,this.options.filter));if(this.options.template!=null&&typeof this.options.template=="string"){i="",o="",l="",v=document.createElement("div");for(m=0,b=a.length;m<b;m++)s=a[m],u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),o=this._makeTemplate(this.options.template,{model:s,id:s.id,link:s.link,image:u,caption:this._getObjectProperty(s,"caption.text"),likes:s.likes.count,comments:s.comments.count,location:this._getObjectProperty(s,"location.name")}),i+=o;v.innerHTML=i,S=[].slice.call(v.childNodes);for(g=0,w=S.length;g<w;g++)h=S[g],n.appendChild(h)}else for(y=0,E=a.length;y<E;y++)s=a[y],f=document.createElement("img"),u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),f.src=u,this.options.links===!0?(t=document.createElement("a"),t.href=s.link,t.appendChild(f),n.appendChild(t)):n.appendChild(f);document.getElementById(this.options.target).appendChild(n),r=document.getElementsByTagName("head")[0],r.removeChild(document.getElementById("instafeed-fetcher")),c="instafeedCache"+this.unique,window[c]=void 0;try{delete window[c]}catch(x){}}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(typeof this.options.tagName!="string")throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(typeof this.options.locationId!="number")throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(typeof this.options.userId!="number")throw new Error("No user specified. Use the 'userId' option.");if(typeof this.options.accessToken!="string")throw new Error("No access token. Use the 'accessToken' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=""+e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,this.options.limit!=null&&(n+="&count="+this.options.limit),n+="&callback=instafeedCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))i=n.match(r)[1],s=(o=this._getObjectProperty(t,i))!=null?o:"",n=n.replace(r,""+s);return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e.prototype._filter=function(e,t){var n,r,i,s,o;n=[],i=function(e){if(t(e))return n.push(e)};for(s=0,o=e.length;s<o;s++)r=e[s],i(r);return n},e}(),t=typeof exports!="undefined"&&exports!==null?exports:window,t.Instafeed=e}).call(this);


 /*********************************************************************
 *  #### Twitter Post Fetcher v15.0.1 ####
 *  Coded by Jason Mayes 2015. A present to all the developers out there.
 *  www.jasonmayes.com
 *  Please keep this disclaimer with my code if you use it. Thanks. :-)
 *  Got feedback or questions, ask here:
 *  http://www.jasonmayes.com/projects/twitterApi/
 *  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
 *  Updates will be posted to this site.
 *********************************************************************/
 (function(C,p){"function"===typeof define&&define.amd?define([],p):"object"===typeof exports?module.exports=p():p()})(this,function(){function C(a){if(null===r){for(var g=a.length,c=0,k=document.getElementById(D),f="<ul>";c<g;)f+="<li>"+a[c]+"</li>",c++;k.innerHTML=f+"</ul>"}else r(a)}function p(a){return a.replace(/<b[^>]*>(.*?)<\/b>/gi,function(a,c){return c}).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,"")}function E(a){a=a.getElementsByTagName("a");
 for(var g=a.length-1;0<=g;g--)a[g].setAttribute("target","_blank")}function l(a,g){for(var c=[],k=new RegExp("(^| )"+g+"( |$)"),f=a.getElementsByTagName("*"),h=0,b=f.length;h<b;h++)k.test(f[h].className)&&c.push(f[h]);return c}function F(a){if(void 0!==a&&0<=a.innerHTML.indexOf("data-srcset"))return a=a.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0],decodeURIComponent(a).split('"')[1]}var D="",g=20,G=!0,v=[],x=!1,y=!0,w=!0,z=null,A=!0,B=!0,r=null,H=!0,I=!1,t=!0,J=!0,K=!1,m=null,L={fetch:function(a){void 0===
 a.maxTweets&&(a.maxTweets=20);void 0===a.enableLinks&&(a.enableLinks=!0);void 0===a.showUser&&(a.showUser=!0);void 0===a.showTime&&(a.showTime=!0);void 0===a.dateFunction&&(a.dateFunction="default");void 0===a.showRetweet&&(a.showRetweet=!0);void 0===a.customCallback&&(a.customCallback=null);void 0===a.showInteraction&&(a.showInteraction=!0);void 0===a.showImages&&(a.showImages=!1);void 0===a.linksInNewWindow&&(a.linksInNewWindow=!0);void 0===a.showPermalinks&&(a.showPermalinks=!0);void 0===a.dataOnly&&
 (a.dataOnly=!1);if(x)v.push(a);else{x=!0;D=a.domId;g=a.maxTweets;G=a.enableLinks;w=a.showUser;y=a.showTime;B=a.showRetweet;z=a.dateFunction;r=a.customCallback;H=a.showInteraction;I=a.showImages;t=a.linksInNewWindow;J=a.showPermalinks;K=a.dataOnly;var l=document.getElementsByTagName("head")[0];null!==m&&l.removeChild(m);m=document.createElement("script");m.type="text/javascript";m.src="https://cdn.syndication.twimg.com/widgets/timelines/"+a.id+"?&lang="+(a.lang||"en")+"&callback=twitterFetcher.callback&suppress_response_codes=true&rnd="+
 Math.random();l.appendChild(m)}},callback:function(a){function m(a){var b=a.getElementsByTagName("img")[0];b.src=b.getAttribute("data-src-2x");return a}var c=document.createElement("div");c.innerHTML=a.body;"undefined"===typeof c.getElementsByClassName&&(A=!1);a=[];var k=[],f=[],h=[],b=[],q=[],n=[],e=0;if(A)for(c=c.getElementsByClassName("timeline-Tweet");e<c.length;){0<c[e].getElementsByClassName("timeline-Tweet-retweetCredit").length?b.push(!0):b.push(!1);if(!b[e]||b[e]&&B)a.push(c[e].getElementsByClassName("timeline-Tweet-text")[0]),
 q.push(c[e].getAttribute("data-tweet-id")),k.push(m(c[e].getElementsByClassName("timeline-Tweet-author")[0])),f.push(c[e].getElementsByClassName("dt-updated")[0]),n.push(c[e].getElementsByClassName("timeline-Tweet-timestamp")[0]),void 0!==c[e].getElementsByClassName("timeline-Tweet-media")[0]?h.push(c[e].getElementsByClassName("timeline-Tweet-media")[0]):h.push(void 0);e++}else for(c=l(c,"timeline-Tweet");e<c.length;){0<l(c[e],"timeline-Tweet-retweetCredit").length?b.push(!0):b.push(!1);if(!b[e]||
 b[e]&&B)a.push(l(c[e],"timeline-Tweet-text")[0]),q.push(c[e].getAttribute("data-tweet-id")),k.push(m(l(c[e],"timeline-Tweet-author")[0])),f.push(l(c[e],"dt-updated")[0]),n.push(l(c[e],"timeline-Tweet-timestamp")[0]),void 0!==l(c[e],"timeline-Tweet-media")[0]?h.push(l(c[e],"timeline-Tweet-media")[0]):h.push(void 0);e++}a.length>g&&(a.splice(g,a.length-g),k.splice(g,k.length-g),f.splice(g,f.length-g),b.splice(g,b.length-g),h.splice(g,h.length-g),n.splice(g,n.length-g));var c=[],e=a.length,d=0;if(K)for(;d<
 e;)c.push({tweet:a[d].innerHTML,author:k[d].innerHTML,time:f[d].textContent,image:F(h[d]),rt:b[d],tid:q[d],permalinkURL:void 0===n[d]?"":n[d].href}),d++;else for(;d<e;){if("string"!==typeof z){var b=f[d].getAttribute("datetime"),u=new Date(f[d].getAttribute("datetime").replace(/-/g,"/").replace("T"," ").split("+")[0]),b=z(u,b);f[d].setAttribute("aria-label",b);if(a[d].textContent)if(A)f[d].textContent=b;else{var u=document.createElement("p"),r=document.createTextNode(b);u.appendChild(r);u.setAttribute("aria-label",
 b);f[d]=u}else f[d].textContent=b}b="";G?(t&&(E(a[d]),w&&E(k[d])),w&&(b+='<div class="user">'+p(k[d].innerHTML)+"</div>"),b+='<p class="tweet">'+p(a[d].innerHTML)+"</p>",y&&(b=J?b+('<p class="timePosted"><a href="'+n[d]+'">'+f[d].getAttribute("aria-label")+"</a></p>"):b+('<p class="timePosted">'+f[d].getAttribute("aria-label")+"</p>"))):(w&&(b+='<p class="user">'+k[d].textContent+"</p>"),b+='<p class="tweet">'+a[d].textContent+"</p>",y&&(b+='<p class="timePosted">'+f[d].textContent+"</p>"));H&&(b+=
 '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to='+q[d]+'" class="twitter_reply_icon"'+(t?' target="_blank">':">")+'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id='+q[d]+'" class="twitter_retweet_icon"'+(t?' target="_blank">':">")+'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id='+q[d]+'" class="twitter_fav_icon"'+(t?' target="_blank">':">")+"Favorite</a></p>");I&&void 0!==h[d]&&(b+='<div class="media"><img src="'+F(h[d])+'" alt="Image from tweet" /></div>');
 c.push(b);d++}C(c);x=!1;0<v.length&&(L.fetch(v[0]),v.splice(0,1))}};return window.twitterFetcher=L});
