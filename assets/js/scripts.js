(function(){
	"use strict";
    window.app 			         = {el : {}, fn : {}};
	app.el['window']         = $(window);
    if (app.el['window'].width() > 320){
    
    $('.animated').appear(function() {
      var element = $(this);
      var animation = element.data('animation');
      var animationDelay = element.data('delay');
      if(animationDelay) {
        setTimeout(function(){
          element.addClass( animation + " visible" );
          element.removeClass('hiding');
        }, animationDelay);
      } else {
        element.addClass( animation + " visible" );
        element.removeClass('hiding');
      }               

    }, {accY: -150});
    
  } else {
  
    $('.animated').css('opacity', 1);
    
  }
    // fade in .back-to-top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
})();