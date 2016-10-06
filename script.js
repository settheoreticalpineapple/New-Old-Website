/* * * * * * * * * * * * * * *
 *  Portfolio index scrips   *
 * * * * * * * * * * * * * * */

/* History state object */
var stateObj = {};


/* Tab changing functions */

function openNewTab(tabNumber) {
	$("main section").eq(tabNumber).addClass("active");
	$("header nav a").eq(tabNumber).addClass("active").removeAttr("href");
}

function closeOldTab(tabNumber) {
	$("main section").eq(tabNumber).removeClass("active");
	$("header nav a").eq(tabNumber).removeClass("active").attr("href", "#pages");
}

function openNewTabAndCloseOld(newTabNumber) {
	var currentTab = 0;
	for (var i = 0; i < $("main section").length; i++) {
		if ($("main section").eq(i).hasClass("active")) {
			currentTab = i;
		}
	}

	closeOldTab(currentTab);
	openNewTab(newTabNumber);
}


/* A function that returns a random double between given arguments and rounds it if need be */

function returnRandomNumberBetweenTheParameters(inf, sup, round) {	// double inf, double sup, boolean round
	if (inf > sup) {
		var change = sup;
		sup = inf;
		inf = change;
	} else if (inf == sup) {
		return sup;
	}

	var number = sup * Math.random();
	while (true) {
		if (inf <= number && number <= sup) {
			break;
		}
		number = sup * Math.random();
	}

	if (round) {
		number = Math.round(number);
	}
		
	return number;
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/* Page Load */

$(document).ready(function() {

	/* Implementing smoothScroll */
	$("a").smoothScroll();

	
	/* Copyright Year */
	(function(){
		var year = new Date();
		$(".year").empty().append(year.getFullYear());
	})();
	
	
	/* Language selection */	
	$(".lang a").each(function(){
		$(this).click(function(){
			$("html").attr("lang", $(this).attr("lang"));
		});
	});
	
	
	/* Portfolio url */
	(function(){
		if(window.location.pathname != "/") {
			$("#this").empty().append(window.location.hostname + window.location.pathname);		// for domain roots
		} else {
			$("#this").empty().append(window.location.hostname);								// for non-root paths
		}
		var url1 = "http://validator.w3.org/check?uri=" + window.location.href;					// W3C HTML validator link
		$("#validhtml").attr("href", url1);
	})();
	
	/* Email */
	(function(){
		var email1 = "%6A%6F%6E%69%2E%70%75%6C%6A%75%6A%61%72%76%69%40%68%65%6C%73%69%6E%6B%69%2E%66%69";
		var email2 = "";
		$("#email").children().each(function(){
			if ($(this).attr("lang") == "fi") {
				$(this).find("a").eq(0).attr("href", "mailto:" + decodeURIComponent(email1));
				$(this).find("a").eq(0).text(decodeURIComponent(email1));
			} else if ($(this).attr("lang") == "en") {
				$(this).find("a").eq(0).attr("href", "mailto:" + decodeURIComponent(email2));
				$(this).find("a").eq(0).text(decodeURIComponent(email2));
			}
		});
	})();

	
	/* Implementing lazyLoad */
	$("img.lazy").lazyload({
		effect : "fadeIn",
		failure_limit : $("img").length,
		skip_invisible : false
	});
	
	
	/* Preview letters */
	(function(){
		$("main section").each(function(){
			$(this).prepend('<a class="previewInitial"></a>');
		});
		$(".previewInitial").each(function(){
			var initial = {en: "", fi: "", other: {lang: "", letter: ""}};
			for (var i = 0; i < $(this).siblings("h2").length; i++) {
				if ($(this).siblings("h2").eq(i).attr("lang") == "fi") {
					initial.fi = $(this).siblings("h2").eq(i).text().substr(0,1);
				} else if ($(this).siblings("h2").eq(i).attr("lang") == "en") {
					initial.en = $(this).siblings("h2").eq(i).text().substr(0,1);
				} else {
					initial.other.letter = $(this).siblings("h2").eq(i).text().substr(0,1);
					initial.other.lang = $(this).siblings("h2").eq(i).attr("lang");
				}
			}
			
			if (initial.other.letter == "") {
				$(this).append('<span lang="fi">'+ initial.fi +'</span><span lang="en">'+ initial.en + '</span>');
			} else {
				$(this).append('<span lang="'+ initial.other.lang +'">'+ initial.other.letter +'</span>');
			}
		});
	})();
	
	
	/* Implementing changeTab */
	(function(){
		$("header nav a").click(function(){		// Tab nav links
			if (!$(this).hasClass("active")) {
				openNewTabAndCloseOld($("header nav a").index($(this)));
			}
		});

		$("main section a[href='#pages']").click(function(){		// Links inside tabs
			openNewTabAndCloseOld($(this).data("tab"));
		});
		
		$("main section .previewInitial").click(function(){		// Clicking the sections
			openNewTabAndCloseOld($("main section").index($(this).parent()));
		});
		
		openNewTab(0);
	})();

	
	/* Implementing diabolicImagePreview */
	diabolicImagePreview($("figure img"));
	
	
	/* Parallax Scrolling */
	(function(){
		function scrollBackground(element) {
			var yPos = -($(window).scrollTop() / element.data("speed"));
			element.css("background-position", "0 " + yPos + "px");
		}
		$(".parallaxbg").each(function(){
			scrollBackground($(this));
			var prxbg = $(this);
			$(window).scroll(function() {
				scrollBackground(prxbg);
			});
		});
	})();
	
	
	/* Decorative random boxes */
	(function(){
		var boxList = [];
		for (var i = 0; i < Math.ceil(returnRandomNumberBetweenTheParameters(100, 200, true)); i++) {
			boxList[i] = { width: returnRandomNumberBetweenTheParameters(5, 16, true) };	// Creating an object
			boxList[i].height = boxList[i].width;											// Adding stuff to the object
			var random = returnRandomNumberBetweenTheParameters(0, 1, true);				// A random boolean-ish
			boxList[i].posX =
				returnRandomNumberBetweenTheParameters(2, 35 - boxList[i].width) * random
				+ returnRandomNumberBetweenTheParameters(65, 98 - boxList[i].width) * (1 - random);
			boxList[i].posY = returnRandomNumberBetweenTheParameters(2, 98 - boxList[i].height);
		}
		
		for (var i = 0; i < boxList.length; i++) {
			$("main").append('<div style="'
				+  'width: ' + boxList[i].width  + 'vmin; '
				+ 'height: ' + boxList[i].height + 'vmin; '
				+   'left: ' + boxList[i].posX   + 'vw; '
				+    'top: ' + boxList[i].posY   + 'vh;' +
			'"></div>');
		}
	})();
	
	
	/* Front page portrait */
	curvifyAnImage("#portrait", 0.50, "right", "mie", false, function() {
		diabolicImagePreview($("#portrait"));
		$(".mie").each(function(){
			$(this).css({"cursor": "pointer", "margin-right": "-18%", "padding-left": "0.3rem"});
			$(this).click(function(){
				$("#portrait").click();
			});
		});
	});

	
	
});