var $window, root, scrollTop,
	loadedAssetsCounter = 0,
	wiperSF = 20,
	tabletWidth = 1024,
	tabletSmallWidth = 800,
	smallScreenWidth = 600;

/* Core
   ========================================================================== */

var Core = {

	init: function() {

		$window = $(window);
		root = $('html, body');
		$window.on('ready scroll', function() {
			scrollTop = $window.scrollTop();
		});

		// detect android
		var ua = navigator.userAgent.toLowerCase(),
			isAndroid = ua.indexOf('android') > -1;
		if (isAndroid) $('html').addClass('device-android');

		jQuery.extend(jQuery.easing, {
			easeOutCubic: function (x, t, b, c, d) {
				return c*((t=t/d-1)*t*t + 1) + b;
			}
		});
	}
};

/* Header
   ========================================================================== */

var Header = {

	el: $('.page-header'),
	switcherEl: $('.menu-switcher'),

	init: function() {

		// load icon
		this.el.find('.logo i').load('img/logo-shape.svg');
		this.switcherEl.find('i').append('<em/>');

		// adjust header position
		$window.on('ready load scroll resize', function() {
			if (scrollTop >= ContentSections.offsetTop) {
				if (!Modernizr.touch && window.innerWidth > tabletWidth) {
					Header.el.addClass('fixed');
				} else {
					Header.el.addClass('visible');
				}
			} else {
				if (!Modernizr.touch && window.innerWidth > tabletWidth) {
					Header.el.removeClass('fixed');
				} else {
					Header.el.removeClass('visible');
				}
			}

			
		});

	}
};



/* Menu
   ========================================================================== */

var Menu = {

	el: $('.main-menu'),

	init: function() {

		// load icons
		this.markCurrentEl = $('<i class="mark-current"/>');
		this.markCurrentEl.load('img/logo-shape.svg').appendTo(this.el.find('nav'));

		// move the logo to stick with the hovered nav item
		
	}
};

/* Intro Section
   ========================================================================== */

var IntroSection = {

	el: $('.section-intro'),
	assetsLoaded: 0,

	wiper: {

		el: $('#wiper'),
		stageEl: $('#wiper g'),
		sectorEl: $('#wiper path'),
		lastStopEl: $('#wiper stop:last'),

		draw: function(start, teta) {

			var start_deg = start,
				teta_deg = parseFloat(teta, 10),
				radius = 50,
				large_arc_flag = 0,
				sweep_flag = 0,
				digits = 2,
				start_rad, teta_rad, x, y, pointA, pointB, arc;

			if (teta_deg >= 360) { teta_deg = 359.99; }
			if (teta_deg <= -360) { teta_deg = -359.99; }

			start_rad = start_deg * Math.PI/180;
			teta_rad = teta_deg * Math.PI/180;

			x = Math.cos(start_rad) * radius;
			y = Math.sin(start_rad) * radius;
			pointA = [x+50, 50-y];
			x = Math.cos(start_rad+teta_rad) * radius;
			y = Math.sin(start_rad+teta_rad) * radius;
			pointB = [x+50, 50-y];

			if (teta_deg > 180) { large_arc_flag = 1; }
			if (teta_deg < 0) { large_arc_flag = 0; sweep_flag = 1; }
			if (teta_deg < -180) { large_arc_flag = 1; sweep_flag = 1; }
			arc = 'M 50 50 '
				+'L '+pointA[0].toFixed(digits)+' '+pointA[1].toFixed(digits)+' '
				+'A 50 50 '+start_rad.toFixed(digits)+' '
				+ large_arc_flag+' '+sweep_flag+' '
				+ pointB[0].toFixed(digits)+' '+pointB[1].toFixed(digits)+' '
				+'Z';

			this.sectorEl.attr('d', arc);
		},

		updateSize: function() {
			var ww = window.innerWidth,
				wh = window.innerHeight,
				newDiameter = Math.max(ww,wh) * 2.3,
				newTop = - (newDiameter - wh) / 2 - wh / 2 - 1,
				newLeft = - (newDiameter - ww) / 2,
				minScale = newDiameter / 100;

			if (window.innerWidth <= 400) { // mobile portrait
				newDiameter = Math.max(ww,wh) * 3;
				newLeft = - (newDiameter - ww * 2) / 2;
				newTop = - newDiameter / 2;
				minScale = newDiameter / 100;
			}

			this.el.css({
				width: newDiameter,
				height: newDiameter,
				top: newTop,
				left: newLeft
			});

			// update gradient color position
			var lastStopOffset = (newDiameter - (newDiameter - wh * 2) / 2) / newDiameter * 100;
			this.lastStopEl.attr('offset', lastStopOffset.toFixed(2)+'%');

			// update scale
			this.stageEl.attr('transform', 'scale('+minScale+') '+'translate(0,0)');
		}
	},

	updateBodySize: function() {
		if (!Modernizr.touch) {
			var height = '';
			if (window.innerWidth > tabletWidth) {
				height = ContentSections.offsetTop + (window.innerHeight * (ContentSections.el.children('.section').length - 1)) + $('.section-work').height();
			}
			$('body').css({ height: height });
		}
	},

	keywordRotator: {

		el: $('.keyword-rotator'),
		keywords: [],

		play: function() {
			var rotator = this;
			var play = function() {
				var curSet = rotator.el.data('keyword-set'),
					nextSet = curSet < 2 ? curSet + 1 : 0;
				rotator.el.children('[data-alt]').each(function(i) {
					var t = i == 0 ? 0 : 250;
					var line = $(this);
					setTimeout(function() {
						line.children().eq(curSet).addClass('outgoing');
						setTimeout(function() {
							line.children().eq(nextSet).addClass('active');
						}, 750);
						setTimeout(function() {
							line.children().eq(curSet).attr('class', '');
						}, 750);
					}, t);
				});
				rotator.el.data('keyword-set', nextSet);
			}
			play();
			setTimeout(play, 3000);
		},

		init: function() {
			var keywords = this.keywords;

			this.el.find('span[data-alt]').each(function() {
				var line = $(this);
				var a = [];
				a.push(line.text());
				var alt = line.data('alt').split(', ');
				a[1] = alt[0];
				a[2] = alt[1];
				keywords.push(a);
				line.wrapInner('<em class="active">');
				for (var i = 1; i < a.length; i++) {
					line.append('<em>'+a[i]+'</em>');
				}
			});

			this.el.data('keyword-set', 0);
		}
	},

	scrollIndRotator: {

		el: $('.scroll-ind'),

		play: function() {

			var line = this.el.children().first();
			var play = function() {
				line.addClass('transition')
					.wait(10).addClass('outgoing')
					.wait(750+100).removeClass('transition')
					.wait(10).addClass('incoming')
					.wait(10).removeClass('outgoing')
					.wait(10).addClass('transition')
					.wait(10).removeClass('incoming');
			}
			play();
			setInterval(play, 3000);
		}
	},

	startAnimation: function() {
		IntroSection.el.find('.bg').addClass('init');
		$({ value: 180 }).animate({ value: 240 }, {
			duration: 1000,
			step: function() {
				IntroSection.wiper.draw(0, this.value);
			},
			easing: 'easeOutCubic',
			complete: function() {
				$('.logo-main').addClass('init');
				setTimeout(function() {
					IntroSection.keywordRotator.el.addClass('init');
					IntroSection.keywordRotator.play();
					setTimeout(function() {
						if (window.innerWidth > tabletWidth) {
							$('.scroll-ind').addClass('init');
							setTimeout(function() {
								IntroSection.scrollIndRotator.play();
							}, 3000);
						} else {
							IntroSection.touchDevAnimation.play();
						}
					}, 2500);
				}, 1000);
				IntroSection.startAnimationDone = true;
			}
		});
	},

	touchDevAnimation: {

		animStep1: function() {
			$({ value: 240 }).animate({ value: 359.9 }, {
				duration: 1500,
				step: function() {
					IntroSection.wiper.draw(0, this.value);
				}
			});

			TweenMax.to('.section-intro .slide-1, .logo-main', 1.5, { alpha: 0 });
			TweenMax.to('.section-intro .slide-2', 1.5, { alpha: 1, visibility: 'visible', delay: .75 });

			setTimeout(function() {
				IntroSection.el.addClass('reversed');
				$('.logo-main').hide();
			}, 1510);
		},

		animStep2: function() {

			$({ value: 359.9 }).animate({ value: 180 }, {
				duration: 1800,
				step: function() {
					IntroSection.wiper.draw(0, this.value);
				}
			});

			TweenMax.to('.section-intro .slide-2', 1.5, { alpha: 0 });
			TweenMax.to('.section-intro .slide-3', 1.5, { alpha: 1, visibility: 'visible', delay: .75 });
		},

		animStep3: function() {
			if (scrollTop < window.innerHeight) {
			//	NavEnhancements.goTo(3);

				// show first slide again
				setTimeout(function() {
					IntroSection.el.removeClass('reversed');
					IntroSection.wiper.draw(0, 240);
					TweenMax.to('.section-intro .slide-1, .logo-main', .01, { alpha: 1, visibility: 'visible' });
					TweenMax.to('.section-intro .slide-3', .01, { alpha: 0 });
					$('.logo-main').show();
				}, 750+100);
			}
		},

		play: function() {

			var t = this;
			this.animStep1();

			setTimeout(function() {
				t.animStep2();

				setTimeout(function() {
					t.animStep3();
				}, 4000);
			}, 4000);
		}
	},

	init: function() {

		// load logo and background image
		var i1 = $('<span class="i1">'),
			i2 = $('<span class="i2">');
			mainLogo = $('.logo-main');
		var incrementAssetsCounter = function() {
			IntroSection.assetsLoaded++;
		}
		i1.load('img/heraldDigital.jpg', function() {
			incrementAssetsCounter();
			updateLoadedAssetsCounter('logo part 1');
		});
		

		// load video bg
		if (!Modernizr.touch && window.innerWidth > tabletWidth) { // desktop
			var BV = new $.BigVideo({
				container: $('.video-bg'),
				useFlashForFirefox: false
			});
			BV.init();
			BV.show('assets/video/video.mp4', {
				ambient: true,
				altSource: 'video/video.webm'
			});
			BV.getPlayer().on('loadedmetadata', function() {
				incrementAssetsCounter();
				updateLoadedAssetsCounter('video meta data');
			});
			BV.getPlayer().on('loadeddata', function() {
				updateLoadedAssetsCounter('video data');
			});
		} else { // mobile
			var bgImgPath = 'img/bg-intro.gif';
			$('<img/>').attr({ src: bgImgPath }).on('load', function() {
				$(this).remove();
				IntroSection.el.find('.bg').css({ backgroundImage: 'url('+bgImgPath+')' });
				incrementAssetsCounter();
				updateLoadedAssetsCounter('intro bg image');
			});
		}

		$window.on('ready load resize', function() {
			IntroSection.wiper.updateSize();
			IntroSection.wiper.el.css({ display: 'block' });
			IntroSection.updateBodySize();
		});

		this.keywordRotator.init();

		IntroSection.wiper.draw(0, 180);

		var videoPaused = false;

		$window.on('ready scroll', function() {
			if (IntroSection.startAnimationDone) {

				if (!Modernizr.touch && window.innerWidth > tabletWidth) { // desktop
					var scrollFactor = scrollTop / wiperSF;
					if (scrollFactor <= 120) {
						IntroSection.wiper.draw(0, Math.min(240 + scrollFactor, 360));
						if (IntroSection.el.hasClass('reversed')) {
							IntroSection.el.removeClass('reversed');
						}
					} else if (scrollFactor > 120 && scrollFactor < 999) {
						if (!IntroSection.el.hasClass('reversed')) {
							IntroSection.el.addClass('reversed');
						}
						var t = Math.max(360 - (scrollFactor - 120), 180);
						IntroSection.wiper.draw(0, t);
					}

					// update current slide index
					if (scrollFactor <= 120) {
					//	NavEnhancements.currentSlideIndex = 0;
					} else if (scrollFactor <= 300) {
					//	NavEnhancements.currentSlideIndex = 1;
					} else if (scrollFactor <= 360) {
					//	NavEnhancements.currentSlideIndex = 2;
						if (ContentSections.inViewport()) {
					//		NavEnhancements.currentSlideIndex = 3;
						}
					} else {
						if (ContentSections.inViewport()) {
							var visibleSectionIndex = Math.round((scrollTop - ContentSections.offsetTop) / window.innerHeight);
					//		NavEnhancements.currentSlideIndex = visibleSectionIndex + 3;
						}
					}
				}

				// put the intro below the footer
				if (!Modernizr.touch & window.innerWidth > tabletWidth) {
					if (scrollTop > ContentSections.offsetTop) {
						if (!IntroSection.el.hasClass('below-footer')) {
							IntroSection.el.addClass('below-footer');
						}
					} else {
						if (IntroSection.el.hasClass('below-footer')) {
							IntroSection.el.removeClass('below-footer');
						}
					}

					// hide intro section and pause video bg
					var csHeight = window.innerHeight * ContentSections.el.children('.section').length;
					var isSafari = /constructor/i.test(window.HTMLElement);
					if (scrollTop > ContentSections.offsetTop && scrollTop < ContentSections.offsetTop + csHeight - window.innerHeight) {
						if (!videoPaused || !IntroSection.el.hasClass('hidden')) {
							BV.getPlayer().pause();
							IntroSection.el.addClass('hidden');
							videoPaused = true;
							// if (isSafari && !Footer.el.hasClass('sffix')) {
							// 	Footer.el.addClass('sffix');
							// }
						}
					} else {
						if (videoPaused || IntroSection.el.hasClass('hidden')) {
							BV.getPlayer().play();
							IntroSection.el.removeClass('hidden');
							videoPaused = false;
							// if (isSafari && Footer.el.hasClass('sffix')) {
							// 	Footer.el.removeClass('sffix');
							// }
						}
					}

				}

			}
		});

		var wrap = $('.section-intro .wrap');
		$window.on('scroll', function() {
			if (scrollTop < window.innerHeight) {
				if (parseInt(wrap.css('opacity')) == 0) {
					wrap.css('opacity', 1);
				}
			}
		}, 100);


		// update size
		$window.on('ready resize', function() {
			IntroSection.el.height(window.innerHeight);
		});

		// on scroll animations

		if (!Modernizr.touch && window.innerWidth > tabletWidth) { // desktop

			var controller = new ScrollMagic();
			var scrollFactor = wiperSF;

			var scene1 = new ScrollScene({ offset: scrollFactor * 10, duration: scrollFactor * 90 })
				.setTween(TweenMax.to('.section-intro .slide-1, .logo-main', 0.5, { alpha: 0 }));

			var scene2 = new ScrollScene({ offset: scrollFactor * 80, duration: scrollFactor * 60 })
				.setTween(TweenMax.to('.section-intro .slide-2', 0.5, { alpha: 1, visibility: 'visible', y: 0 }));

			var scene3 = new ScrollScene({ offset: scrollFactor * 140, duration: scrollFactor * 60 })
				.setTween(TweenMax.to('.section-intro .slide-2', 0.5, { alpha: 0 }));

			var scene4 = new ScrollScene({ offset: scrollFactor * 205, duration: scrollFactor * 150 })
				.setTween(TweenMax.to('.section-intro .slide-3', 0.5, { alpha: 1, visibility: 'visible', y: 0 }));

			controller.addScene([
				scene1,
				scene2,
				scene3,
				scene4
				
			]);

			var slide3 = $('.section-intro .slide-3');
			$window.on('scroll', function() {
				if (scrollTop > ContentSections.offsetTop) {
					slide3.hide();
				} else {
					slide3.show();
				}
			});
		}

		$window.trigger('resize');

	},

	play: function() {
		setTimeout(function() {
			IntroSection.startAnimation();
		}, Modernizr.touch ? 1 : 1);
	}
};

/* Content Sections
   ========================================================================== */

var ContentSections = {

	el: $('.content-sections'),
	sections: $('.content-sections .section'),


	updateSectionsHeight: function() {
		if (window.innerWidth > tabletWidth) {
			this.sections.height(window.innerHeight);
		} else {
			this.sections.css({ height: '' });
		}
	},

	
	init: function() {

		if (window.innerWidth > tabletWidth) {
			this.offsetTop = wiperSF * 300 + window.innerHeight;
		} else {
			this.offsetTop = window.innerHeight;
		}

		this.el.css({ top: this.offsetTop });

		this.updateSectionsHeight();
		$window.on('resize', $.proxy(this.updateSectionsHeight, this));

		
	}
};


/* Browser Polyfills
   ========================================================================== */

'svg use'.replace(/\w+/g, function (element) {
	document.createElement(element);
});





/* Loader
   ========================================================================== */

var Loader = {

	el: $('.loader'),
	barEl: $('.loader .bar'),
	progressEl: $('.loader .progress'),

	updateProgress: function(value) {
		this.progressEl.css({ width: value+'%' });
	},

	hide: function() {
		this.barEl.addClass('hidden');

		setTimeout(function() {
			Loader.el.addClass('hidden');
			$('body').addClass('released');

			setTimeout(function() {
				IntroSection.play();
			}, 750);
		}, 1);
	}
};

/* Preloading
   ========================================================================== */

var assetsCounterMax = !Modernizr.touch && window.innerWidth > tabletWidth ? 15 : 14;

var updateLoadedAssetsCounter = function(assetType) {
	loadedAssetsCounter++;
	var percentage = parseInt(loadedAssetsCounter / assetsCounterMax * 100);
	if (percentage.toString().length == 1) {
		percentage = '  ' + percentage;
	} else if (percentage.toString().length == 2) {
		percentage = ' ' + percentage;
	}
	

	Loader.updateProgress(percentage);

	if (loadedAssetsCounter == assetsCounterMax) {
		

		setTimeout(function() {
			Loader.hide();
		}, 150);
	}
};

var loadJsAssets = function(callback) {
	$.ajax({
		url: 'assets/js/libs-combined.min.js',
		dataType: "script",
		cache: true
	}).done(function() {
		updateLoadedAssetsCounter('javascript');
		callback();
	});
}

var loadSvgSprites = function() {

	$.each([
		'client-icons',
		'work-icons',
		'service-icons',
		'nav-icons'
	], function(i, val) {
		$('<span class="svg-sprite"/>').load('img/'+val+'.svg').prependTo('body');
		updateLoadedAssetsCounter('svg sprite');
	});

	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)) { // mobile safari
		$('svg use').each(function() {
			var href = $(this).attr('xlink:href');
			var filename = 'img/';
			if (href.substr(1,6) == 'client') {
				filename += 'client-icons.svg';
			} 
			href = filename + href;
			if (filename.length > 4) {
				$(this).attr('xlink:href', href);
			}
		});
	}
}

/* Start
   ========================================================================== */

$(function() {

	loadJsAssets(function() {

		$('body').imagesLoaded().progress(function() {
			updateLoadedAssetsCounter('image');
		});

		loadSvgSprites();

		Core.init();
		ContentSections.init();
		Header.init();
		Menu.init();
		IntroSection.init();
	
	});

});
