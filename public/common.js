"use strict";

var $ = jQuery;

/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */
(function(e){e.fn.extend({slimScroll:function(f){var a=e.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},f);this.each(function(){function v(d){if(r){d=d||window.event;
	var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);e(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&n(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function n(d,g,e){k=!1;var f=b.outerHeight()-c.outerHeight();g&&(g=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),g=Math.min(Math.max(g,0),f),g=0<d?Math.ceil(g):Math.floor(g),c.css({top:g+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());g=
		l*(b[0].scrollHeight-b.outerHeight());e&&(g=d,d=g/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),f),c.css({top:d+"px"}));b.scrollTop(g);b.trigger("slimscrolling",~~g);w();p()}function x(){u=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),30);c.css({height:u+"px"});var a=u==b.outerHeight()?"none":"block";c.css({display:a})}function w(){x();clearTimeout(B);l==~~l?(k=a.allowPageScroll,C!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;C=l;u>=b.outerHeight()?k=!0:(c.stop(!0,
		!0).fadeIn("fast"),a.railVisible&&m.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(B=setTimeout(function(){a.disableFadeOut&&r||y||z||(c.fadeOut("slow"),m.fadeOut("slow"))},1E3))}var r,y,z,B,A,u,l,C,k=!1,b=e(this);if(b.parent().hasClass(a.wrapperClass)){var q=b.scrollTop(),c=b.siblings("."+a.barClass),m=b.siblings("."+a.railClass);x();if(e.isPlainObject(f)){if("height"in f&&"auto"==f.height){b.parent().css("height","auto");b.css("height","auto");var h=b.parent().parent().height();b.parent().css("height",
		h);b.css("height",h)}else"height"in f&&(h=f.height,b.parent().css("height",h),b.css("height",h));if("scrollTo"in f)q=parseInt(a.scrollTo);else if("scrollBy"in f)q+=parseInt(a.scrollBy);else if("destroy"in f){c.remove();m.remove();b.unwrap();return}n(q,!1,!0)}}else if(!(e.isPlainObject(f)&&"destroy"in f)){a.height="auto"==a.height?b.parent().height():a.height;q=e("<div></div>").addClass(a.wrapperClass).css({position:"relative",overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",
	width:a.width,height:a.height});var m=e("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=e("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,
	WebkitBorderRadius:a.borderRadius,zIndex:99}),h="right"==a.position?{right:a.distance}:{left:a.distance};m.css(h);c.css(h);b.wrap(q);b.parent().append(c);b.parent().append(m);a.railDraggable&&c.bind("mousedown",function(a){var b=e(document);z=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);n(0,c.position().top,!1)});b.bind("mouseup.slimscroll",function(a){z=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",
		function(a){a.stopPropagation();a.preventDefault();return!1});m.hover(function(){w()},function(){p()});c.hover(function(){y=!0},function(){y=!1});b.hover(function(){r=!0;w();p()},function(){r=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(A=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&(n((A-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),A=b.originalEvent.touches[0].pageY)});
	x();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),n(0,!0)):"top"!==a.start&&(n(e(a.start).position().top,null,!0),a.alwaysVisible||c.hide());window.addEventListener?(this.addEventListener("DOMMouseScroll",v,!1),this.addEventListener("mousewheel",v,!1)):document.attachEvent("onmousewheel",v)}});return this}});e.fn.extend({slimscroll:e.fn.slimScroll})})(jQuery);

$(document).ready(function () {

	//***** Progress Bar *****//

	var loaded = 0;
	var imgCounter = $("body img").length;
	if (imgCounter > 0) {
		$("body img").load(function () {
			loaded++;
			var newWidthPercentage = (loaded / imgCounter) * 100;
			animateLoader(newWidthPercentage + '%');
		});
	} else {
		setTimeout(function () {
			$("#progress-bar").css({
				"opacity": 0,
				"width": "100%"
			});
		}, 500);
	}

	function animateLoader(newWidth) {
		$("#progress-bar").width(newWidth);
		if (imgCounter === loaded) {
			setTimeout(function () {
				$("#progress-bar").animate({opacity: 0});
			}, 500);
		}
	}

	//***** Side Menu *****//
	$(document).delegate(".side-menus li.menu-item-has-children > a","click", function () {
		$(this).parent().siblings().children("ul").slideUp();
		$(this).parent().siblings().removeClass("active");
		$(this).parent().children("ul").slideToggle();
		$(this).parent().toggleClass("active");
		return false;
	});

	//***** Side Menu Option *****//
	$(document).delegate(".menu-options","click",function () {

		$(".side-header.opened-menu").toggleClass('slide-menu');
		$(".main-content").toggleClass('wide-content');
		$("footer").toggleClass('wide-footer');
		$(".menu-options").toggleClass('active');

		var hamburgerIcon = $('.menu-options .hamburger');

		if (hamburgerIcon.hasClass('fa-times')){
			hamburgerIcon.removeClass('fa-times');
			hamburgerIcon.addClass('fa-bars');
		} else {
			hamburgerIcon.addClass('fa-times');
			hamburgerIcon.removeClass('fa-bars');
		}

	});

	/*** FIXED Menu APPEARS ON SCROLL DOWN ***/
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		if (scroll >= 10) {
			$(".side-header").addClass("sticky");
		}
		else {
			$(".side-header").removeClass("sticky");
			$(".side-header").addClass("");
		}
	});

	$(document).delegate(".side-menus nav > ul > li ul li > a","click", function () {
		$(".side-header").removeClass("slide-menu");
		$(".menu-options").removeClass("active");
	});

	//***** Quick Stats *****//
	$(document).delegate('.show-stats',"click", function () {
		$(".toggle-content").addClass('active');
	});

	//***** Quick Stats *****//
	$(document).delegate('.toggle-content > span',"click", function () {
		$(".toggle-content").removeClass('active');
	});

	//***** Quick Stats *****//
	$(document).delegate('.quick-links > ul > li > a.quick-link',"click", function () {
		$(this).parent().siblings().find('.dialouge').fadeOut();
		$(this).next('.dialouge').fadeIn();
		return false;
	});

	$(document).delegate("html","click", function () {
		$(".dialouge").fadeOut();
	});


	//***** Toggle Full Screen *****//
	function goFullScreen() {
		var
			el = document.documentElement
			, rfs =
				el.requestFullScreen
				|| el.webkitRequestFullScreen
				|| el.mozRequestFullScreen
				|| el.msRequestFullscreen

			;
		rfs.call(el);
	}

	$(document).delegate("#toolFullScreen","click", function () {
		goFullScreen();
	});

	//***** Side Menu *****//
	$(function () {
	    $('.side-menus').slimScroll({
	        height: '450px',
	        wheelStep: 10,
	        size: '6px'
	    });
	});


	//$(".data-attributes span").peity("donut");

	// Activates Tooltips for Social Links
	$('[data-toggle="tooltip"]').tooltip();

	// Activates Popovers for Social Links
	$('[data-toggle="popover"]').popover();


	//*** Refresh Content ***//
	$(document).delegate('.refresh-content',"click", function () {
		$(this).parent().parent().addClass("loading-wait").delay(3000).queue(function (next) {
			$(this).removeClass("loading-wait");
			next();
		});
		$(this).addClass("fa-spin").delay(3000).queue(function (next) {
			$(this).removeClass("fa-spin");
			next();
		});
	});

	//*** Expand Content ***//
	$(document).delegate('.expand-content',"click", function () {
		$(this).parent().parent().toggleClass("expand-this");
	});

	//*** Delete Content ***//
	$(document).delegate('.close-content',"click", function () {
		$(this).parent().parent().slideUp();
	});

	// Activates Tooltips for Social Links
	$('.tooltip-social').tooltip({
		selector: "a[data-toggle=tooltip]"
	});

	$('#tabs').tab();
});